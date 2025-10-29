import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BikeStationService } from '../services/bike-stations.service';
import { Observable } from 'rxjs';
import * as models from '../models';
import { ApiBody } from '@nestjs/swagger';

@Controller()
export class BikesStationsController {
  constructor(private readonly dublinBikesService: BikeStationService) {}

  @Get('schema')
  getSchema(): Observable<models.Schema[]> {
    return this.dublinBikesService.getSchema();
  }

  @Post('data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        where: {
          type: 'object',
          properties: {
            fieldName: {
              type: 'object',
              properties: {
                operator: {
                  type: 'enum',
                  enum: Object.values(models.Operator),
                },
                value: { type: 'string' },
              },
            },
          },
        },
      },
      required: ['where'],
    },
  })
  getData(@Body() body?: models.Query): Observable<models.Bike[]> {
    return this.dublinBikesService.getBikeStations(body ?? { where: {} });
  }

  @Get('data/:id')
  getDataItem(@Param('id') id: string): Observable<models.Bike> {
    return this.dublinBikesService.getBikeStation(Number(id));
  }
}
