import { DublinBikesController } from './dublin-bikes.controller';
import { DublinBikesService } from '../services/dublin-bikes.service';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import data from '../specs/data/dublin-bikes.json';
import schema from '../specs/data/schema.json';

describe('DublinBikesController', () => {
  let controller: DublinBikesController;
  let service: DublinBikesService;

  beforeEach(() => {
    const httpService = new HttpService();
    service = new DublinBikesService(httpService);
    controller = new DublinBikesController(service);
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

  describe('getData', () => {
    it('should return the data', () => {
      jest.spyOn(service, 'getData').mockImplementation(() => of(data));
      controller.getData({ where: {} }).subscribe((data) => {
        expect(data).toBeDefined();
      });
    });

    it('should return the data without filters', () => {
      jest.spyOn(service, 'getData').mockImplementation(() => of(data));
      controller.getData().subscribe((data) => {
        expect(data).toBeDefined();
      });
    });

    it('should return the data with filters', () => {
      jest.spyOn(service, 'getData').mockImplementation(() => of(data));
      controller.getData({ where: { name: 'John' } }).subscribe((data) => {
        expect(data).toBeDefined();
      });
    });

    it('should return an error if the data cannot be retrieved', () => {
      jest
        .spyOn(service, 'getData')
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
