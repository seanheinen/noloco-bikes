import { HttpService } from '@nestjs/axios';
import { DublinBikesService } from '../services/dublin-bikes.service';
import { of, throwError } from 'rxjs';
import { AxiosResponse } from 'axios';
import mockDublinBikes from '../specs/data/dublin-bikes.json';
import mockDublinBikesNormalised from '../specs/data/dublin-bikes-normalised.json';
import mockDublinBikesNormalisedFilteredByBankingTrue from '../specs/data/dublin-bikes-normalised-filtered-by-banking-true.json';
import expectedSchema from '../specs/data/schema.json';
import { Operator } from '../models';

describe('DublinBikesService', () => {
  let service: DublinBikesService;
  let httpService: HttpService;
  const httpResponse = of({ data: mockDublinBikes } as AxiosResponse<
    any,
    any,
    { [key: string | number]: any }
  >);

  beforeEach(() => {
    httpService = new HttpService();
    service = new DublinBikesService(httpService);
  });

  describe('getSchema', () => {
    it('should return the schema', () => {
      jest.spyOn(httpService, 'get').mockImplementation(() => {
        return httpResponse;
      });

      service.getSchema().subscribe((schema) => {
        expect(schema).toStrictEqual(expectedSchema);
      });
    });

    it('should return an error if the schema cannot be retrieved', () => {
      jest.spyOn(httpService, 'get').mockImplementation(() => {
        return throwError(() => new Error('Error getting schema'));
      });

      service.getSchema().subscribe({
        error(err) {
          expect(err).toBeDefined();
        },
      });
    });
  });

  describe('getData', () => {
    it('should return all of the data', () => {
      jest.spyOn(httpService, 'get').mockImplementation(() => {
        return httpResponse;
      });

      service.getData({ where: {} }).subscribe((data) => {
        expect(data.length).toEqual(mockDublinBikesNormalised.length);
      });
    });

    it('should return all of the data where banking is true', () => {
      jest.spyOn(httpService, 'get').mockImplementation(() => {
        return httpResponse;
      });

      service
        .getData({ where: { banking: { operator: Operator.EQ, value: true } } })
        .subscribe((data) => {
          expect(data.length).toEqual(
            mockDublinBikesNormalisedFilteredByBankingTrue.length,
          );
        });
    });
  });
});
