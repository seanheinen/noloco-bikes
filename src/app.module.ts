import { Module } from '@nestjs/common';
import { DublinBikesController } from './controllers/dublin-bikes.controller';
import { DublinBikesService } from './services/dublin-bikes.service';

@Module({
  imports: [],
  controllers: [DublinBikesController],
  providers: [DublinBikesService],
})
export class AppModule {}
