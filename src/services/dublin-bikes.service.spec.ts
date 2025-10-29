import { Test, TestingModule } from '@nestjs/testing';
import { DublinBikesService } from '../services/dublin-bikes.service';

describe('AppController', () => {
  let service: DublinBikesService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [DublinBikesService],
    }).compile();

    service = app.get<DublinBikesService>(DublinBikesService);
  });

  describe('root', () => {
    it('should return the schema', () => {
      expect(service.getSchema()).toBe('Hello World!');
    });

    it('should return the data', () => {
      expect(service.getData({})).toBe('Hello World!');
    });

    it('should return the data with filters', () => {
      expect(service.getData({ where: { name: 'John' } })).toBeDefined();
    });
  });
});
