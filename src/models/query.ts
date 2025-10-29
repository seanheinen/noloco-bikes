export enum Operator {
  EQ = 'eq',
  LT = 'lt',
  GT = 'gt',
}

export interface Filter {
  [key: string]: {
    operator: Operator;
    value: any;
  };
}

export interface Query {
  where: Filter;
}
