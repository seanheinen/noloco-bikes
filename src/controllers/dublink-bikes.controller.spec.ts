import { Test, TestingModule } from '@nestjs/testing';
import { DublinBikesController } from './dublin-bikes.controller';
import { DublinBikesService } from '../services/dublin-bikes.service';

describe('AppController', () => {
  let controller: DublinBikesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DublinBikesController],
      providers: [DublinBikesService],
    }).compile();

    controller = app.get<DublinBikesController>(DublinBikesController);
  });

  describe('root', () => {
    it('should return the schema', () => {
      expect(controller.getSchema()).toBe('Hello World!');
    });

    it('should return the data', () => {
      expect(controller.getData({})).toBe('Hello World!');
    });

    it('should return the data with filters', () => {
      expect(controller.getData({ where: { name: 'John' } })).toBeDefined();
    });
  });
});
