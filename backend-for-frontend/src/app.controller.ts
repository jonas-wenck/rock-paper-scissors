import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

/**
 * This controller proxies requests to the Spring backend by appending the API key header and resending the request body. This allows us to not bundle the API key in the client and not have it in the browser.
 */
@Controller('api/rock-paper-scissors/games')
export class AppController {
  backendUrl: string | undefined;
  backendApiKey: string | undefined;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.backendUrl = this.configService.get<string>('BACKEND_URL');
    this.backendApiKey = this.configService.get<string>('BACKEND_API_KEY');
  }

  @Post()
  async postGame(@Body() body: any): Promise<any> {
    if (this.backendUrl && this.backendApiKey) {
      const response = await firstValueFrom(
        this.httpService.post(
          this.backendUrl,
          body, // only send the request body
          {
            headers: {
              'X-API-KEY': this.backendApiKey,
            },
          },
        ),
      );
      return response.data;
    } else {
      throw new HttpException(
        'An internal error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async getGameRecords(): Promise<any> {
    if (this.backendUrl && this.backendApiKey) {
      const response = await firstValueFrom(
        this.httpService.get(this.backendUrl, {
          headers: {
            'X-API-KEY': this.backendApiKey,
          },
        }),
      );
      return response.data;
    } else {
      throw new HttpException(
        'An internal error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
