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
@Controller('api/rock-paper-scissors')
export class AppController {
  backendBaseUrl: string | undefined;
  backendApiKey: string | undefined;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.backendBaseUrl = this.configService.get<string>('BACKEND_BASE_URL');
    this.backendApiKey = this.configService.get<string>('BACKEND_API_KEY');
  }

  @Post('game')
  async postGame(@Body() body: any): Promise<any> {
    const backendUrl = this.backendBaseUrl + '/game';

    if (backendUrl && this.backendApiKey) {
      const response = await firstValueFrom(
        this.httpService.post(
          backendUrl,
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

  @Get('game-records')
  async getGameRecords(): Promise<any> {
    const backendUrl = this.backendBaseUrl + '/game-records';

    if (backendUrl && this.backendApiKey) {
      const response = await firstValueFrom(
        this.httpService.get(backendUrl, {
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
