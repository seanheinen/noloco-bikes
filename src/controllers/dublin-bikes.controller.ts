import { Body, Controller, Get, Post } from '@nestjs/common';
import { DublinBikesService } from '../services/dublin-bikes.service';

@Controller()
export class DublinBikesController {
  constructor(private readonly dublinBikesService: DublinBikesService) {}

  @Get('schema')
  getSchema(): string {
    return this.dublinBikesService.getSchema();
  }

  @Post('data')
  getData(@Body() body: any): string {
    return this.dublinBikesService.getData(body);
  }
}
