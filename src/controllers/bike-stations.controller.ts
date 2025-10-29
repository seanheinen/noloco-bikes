import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BikeStationService } from '../services/bike-stations.service';
import { Observable } from 'rxjs';
import * as models from '../models';

@Controller()
export class BikesStationsController {
  constructor(private readonly dublinBikesService: BikeStationService) {}

  @Get('schema')
  getSchema(): Observable<models.Schema[]> {
    return this.dublinBikesService.getSchema();
  }

  @Post('data')
  getData(@Body() body?: models.Query): Observable<models.Bike[]> {
    return this.dublinBikesService.getBikes(body ?? { where: {} });
  }

  @Get('data/:id')
  getDataItem(@Param('id') id: string): Observable<models.Bike> {
    return this.dublinBikesService.getBike(id);
  }
}
