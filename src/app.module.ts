import { Module } from '@nestjs/common';
import { DublinBikesController } from './controllers/dublin-bikes.controller';
import { DublinBikesService } from './services/dublin-bikes.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [DublinBikesController],
  providers: [DublinBikesService],
})
export class AppModule {}
