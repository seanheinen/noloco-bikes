import { Body, Controller, Get, Post } from '@nestjs/common';
import { DublinBikesService } from '../services/dublin-bikes.service';
import { Observable } from 'rxjs';
import * as models from '../models';

@Controller()
export class DublinBikesController {
  constructor(private readonly dublinBikesService: DublinBikesService) {}

  @Get('schema')
  getSchema(): Observable<models.Schema[]> {
    return this.dublinBikesService.getSchema();
  }

  @Post('data')
  getData(@Body() body?: models.Query): Observable<models.DataList> {
    return this.dublinBikesService.getData(body ?? { where: {} });
  }
}
