import { HttpService } from '@nestjs/axios';
import { DublinBikesService } from '../services/dublin-bikes.service';
import { of, throwError } from 'rxjs';
import { AxiosResponse } from 'axios';
import mockDublinBikes from '../specs/data/dublin-bikes.json';
import expectedSchema from '../specs/data/schema.json';

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
    // it('should return the data', () => {
    //   expect(service.getData({})).toBe('Hello World!');
    // });
    // it('should return the data with filters', () => {
    //   expect(service.getData({ where: { name: 'John' } })).toBeDefined();
    // });
  });
});
