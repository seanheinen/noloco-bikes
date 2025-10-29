import { Module } from '@nestjs/common';
import { BikesStationsController } from './controllers/bike-stations.controller';
import { BikeStationService } from './services/bike-stations.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [BikesStationsController],
  providers: [BikeStationService],
})
export class AppModule {}
