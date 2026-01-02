import {
  Body,
  Controller,
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
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  @Post('play-game')
  async playGame(@Body() body: any): Promise<any> {
    const backendUrl = this.configService.get<string>('BACKEND_URL');
    const backendApiKey = this.configService.get<string>('BACKEND_API_KEY');

    if (backendUrl && backendApiKey) {
      const response = await firstValueFrom(
        this.httpService.post(
          backendUrl,
          body, // only send the request body
          {
            headers: {
              'X-API-KEY': backendApiKey,
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
}
