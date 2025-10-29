import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { environment } from '../environment';
import { map, Observable } from 'rxjs';
import { DataList, DataType, Operator, Query, Schema } from '../models';
import _ from 'lodash';

@Injectable()
export class DublinBikesService {
  constructor(private readonly httpService: HttpService) {}

  getSchema(): Observable<Schema[]> {
    return this.httpService.get(environment.dublinBikesUrl).pipe(
      map((response) => {
        return this.getSchemaFromData(response.data);
      }),
    );
  }

  getData(query: Query): Observable<DataList> {
    return this.httpService.get(environment.dublinBikesUrl).pipe(
      map((response) => this.normalizeData(response.data as DataList)),
      map((items) => {
        const filters = Object.entries(query.where);
        if (filters.length === 0) return items;

        const validFilters = filters.map(([field, evaluation]) => {
          // Ensure value is valid type
          if (this.getDataType(evaluation.value).type === DataType.UNKNOWN) {
            throw new Error(
              `Invalid data type for filter value: ${evaluation.value} for field: ${field}`,
            );
          }
          return {
            field,
            evaluation,
          };
        });

        return items.filter((item) => {
          return validFilters.every(({ field, evaluation }) => {
            return this.evaluate(
              evaluation.operator,
              evaluation.value,
              item[field],
            );
          });
        });
      }),
    );
  }

  private evaluate(operation: Operator, incoming: any, existing: any): boolean {
    switch (operation) {
      case Operator.EQ:
        return incoming === existing;
      case Operator.LT:
        return incoming < existing;
      case Operator.GT:
        return incoming > existing;
    }
  }

  private normalizeData(data: unknown): DataList {
    if (!Array.isArray(data)) {
      throw new Error('Response data is not a list of objects');
    }

    const normalizedData = data
      .map((item) => {
        if (typeof item !== 'object' || item === null) {
          throw new Error('Response data is not a list of objects');
        }
        return item as object;
      })
      .map((item) =>
        Object.entries(item).reduce(
          (acc, [key, value]) => {
            const normalizedKey = _.camelCase(key);
            const valueType = this.getDataType(value).type;
            switch (valueType) {
              case DataType.DATE:
                return {
                  ...acc,
                  [normalizedKey]:
                    value === null ? null : new Date(value as string),
                };
              case DataType.BOOLEAN:
                return {
                  ...acc,
                  [normalizedKey]:
                    value === null
                      ? null
                      : (value as string | boolean).toString().toLowerCase() ===
                        'true',
                };
              default:
                return { ...acc, [normalizedKey]: value as unknown };
            }
          },
          {} as Record<string, unknown>,
        ),
      );

    return normalizedData;
  }

  private getSchemaFromData(data: unknown): Schema[] {
    // Map of keys and their list of values
    const schemaWithValuesMap = new Map<string, unknown[]>();
    if (Array.isArray(data)) {
      for (const item of data) {
        for (const [key, value] of Object.entries(item as object)) {
          if (schemaWithValuesMap.has(key)) {
            schemaWithValuesMap.get(key)!.push(value);
          } else {
            schemaWithValuesMap.set(key, [value]);
          }
        }
      }
    } else {
      throw new Error('Response data is not a list of objects');
    }

    const schema: Schema[] = [];

    for (const [key, values] of schemaWithValuesMap.entries()) {
      const display = key;
      const name = _.camelCase(key);
      const { type, options } = this.getDataType(values);
      if (type === DataType.UNKNOWN) {
        throw new Error(`Unknown data type for key: ${key}`);
      }

      schema.push({
        display,
        name,
        type,
        options,
      });
    }

    return schema;
  }

  private getDataType(values: unknown): {
    type: DataType;
    options: string[];
  };
  private getDataType(values: unknown[]): {
    type: DataType;
    options: string[];
  } {
    if (!Array.isArray(values)) {
      values = [values];
    }

    const valuesExcludingNulls = values.filter((value) => value !== null);

    // DATE
    // Check for date first since this would match as stirng too
    if (
      valuesExcludingNulls.every(
        (value) =>
          _.isDate(value) || (_.isString(value) && !isNaN(Date.parse(value))),
      )
    ) {
      return { type: DataType.DATE, options: [] };
    }

    // INTEGER AND FLOAT
    if (valuesExcludingNulls.every((value) => _.isNumber(value))) {
      if (valuesExcludingNulls.every((value) => Number.isInteger(value))) {
        return { type: DataType.INTEGER, options: [] };
      } else {
        return { type: DataType.FLOAT, options: [] };
      }
    }

    // BOOLEAN
    if (
      valuesExcludingNulls.every(
        (value) =>
          _.isBoolean(value) ||
          (_.isString(value) && value.toLowerCase() === 'true') ||
          (_.isString(value) && value.toLowerCase() === 'false'),
      )
    ) {
      return { type: DataType.BOOLEAN, options: [] };
    }

    // OPTION
    if (valuesExcludingNulls.every((value) => _.isString(value))) {
      const uniqueValues = _.uniq(valuesExcludingNulls);
      // If less than 20% of the values are unique, it's likely an option ¯\_(ツ)_/¯
      if (uniqueValues.length <= valuesExcludingNulls.length / 5) {
        return { type: DataType.OPTION, options: uniqueValues };
      }
    }

    // TEXT
    if (valuesExcludingNulls.every((value) => _.isString(value))) {
      return { type: DataType.TEXT, options: [] };
    }

    // DEFAULT
    return { type: DataType.UNKNOWN, options: [] };
  }
}
