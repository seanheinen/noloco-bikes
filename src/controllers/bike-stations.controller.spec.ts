import { BikesStationsController } from './bike-stations.controller';
import { BikeStationService } from '../services/bike-stations.service';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import dublinBikeStationsNormalised from '../specs/data/dublin-bike-stations-normalised.json';
import dublinBikeStationsNormalisedFilteredByBankingTrue from '../specs/data/dublin-bike-stations-normalised-filtered-by-banking-true.json';
import schema from '../specs/data/schema.json';
import { Operator } from '../models';

describe('BikeStationsController', () => {
  let controller: BikesStationsController;
  let service: BikeStationService;

  beforeEach(() => {
    const httpService = new HttpService();
    service = new BikeStationService(httpService);
    controller = new BikesStationsController(service);
  });

  describe('getSchema', () => {
    it('should return the schema', () => {
      jest.spyOn(service, 'getSchema').mockImplementation(() => of(schema));
      controller.getSchema().subscribe((schema) => {
        expect(schema).toBeDefined();
      });
    });

    it('should return an error if the schema cannot be retrieved', () => {
      jest
        .spyOn(service, 'getSchema')
        .mockImplementation(() =>
          throwError(() => new Error('Error getting schema')),
        );
      controller.getSchema().subscribe({
        error(err) {
          expect(err).toBeDefined();
        },
      });
    });
  });

  describe('getBikes', () => {
    it('should return the data', () => {
      jest
        .spyOn(service, 'getBikes')
        .mockImplementation(() => of(dublinBikeStationsNormalised));
      controller.getData({ where: {} }).subscribe((data) => {
        expect(data).toBeDefined();
      });
    });

    it('should return the data without filters', () => {
      jest
        .spyOn(service, 'getBikes')
        .mockImplementation(() => of(dublinBikeStationsNormalised));
      controller.getData().subscribe((data) => {
        expect(data).toBeDefined();
      });
    });

    it('should return the data with filters', () => {
      jest
        .spyOn(service, 'getBikes')
        .mockImplementation(() =>
          of(dublinBikeStationsNormalisedFilteredByBankingTrue),
        );
      controller
        .getData({ where: { banking: { operator: Operator.EQ, value: true } } })
        .subscribe((data) => {
          expect(data).toBeDefined();
        });
    });

    it('should return an error if the data cannot be retrieved', () => {
      jest
        .spyOn(service, 'getBikes')
        .mockImplementation(() =>
          throwError(() => new Error('Error getting data')),
        );
      controller.getData({ where: {} }).subscribe({
        error(err) {
          expect(err).toBeDefined();
        },
      });
    });
  });
});
