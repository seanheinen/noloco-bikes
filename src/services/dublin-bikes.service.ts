import { Injectable } from '@nestjs/common';

@Injectable()
export class DublinBikesService {
  getSchema(): string {
    return 'Hello World!';
  }

  getData(body: any): string {
    return body as string;
  }
}
