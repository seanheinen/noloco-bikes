import { HttpService } from '@nestjs/axios';
import { BikeStationService as BikeStationService } from './bike-stations.service';
import { of, throwError } from 'rxjs';
import { AxiosResponse } from 'axios';
import mockDublinBikeStations from '../specs/data/dublin-bike-stations.json';
import mockDublinBikeStationsNormalised from '../specs/data/dublin-bike-stations-normalised.json';
import mockDublinBikeStationsNormalisedFilteredByBankingTrue from '../specs/data/dublin-bike-stations-normalised-filtered-by-banking-true.json';
import expectedSchema from '../specs/data/schema.json';
import { Operator } from '../models';

describe('BikesService', () => {
  let service: BikeStationService;
  let httpService: HttpService;
  const httpResponse = of({ data: mockDublinBikeStations } as AxiosResponse<
    any,
    any,
    { [key: string | number]: any }
  >);

  beforeEach(() => {
    httpService = new HttpService();
    service = new BikeStationService(httpService);
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

  describe('getBikes', () => {
    it('should return all of the data', () => {
      jest.spyOn(httpService, 'get').mockImplementation(() => {
        return httpResponse;
      });

      service.getBikes({ where: {} }).subscribe((data) => {
        expect(data.length).toEqual(mockDublinBikeStationsNormalised.length);
      });
    });

    it('should return all of the data where banking is true', () => {
      jest.spyOn(httpService, 'get').mockImplementation(() => {
        return httpResponse;
      });

      service
        .getBikes({
          where: { banking: { operator: Operator.EQ, value: true } },
        })
        .subscribe((data) => {
          expect(data.length).toEqual(
            mockDublinBikeStationsNormalisedFilteredByBankingTrue.length,
          );
        });
    });
  });
});
