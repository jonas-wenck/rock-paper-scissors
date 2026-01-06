import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

/**
 * This controller proxies requests to the Spring backend by appending the API key header and resending the request body. This allows us to not bundle the API key in the client and not have it in the browser.
 */
@Controller('api/rock-paper-scissors/games')
export class AppController {
  private readonly backendUrl: string | undefined;
  private readonly backendApiKey: string | undefined;
  private readonly logger: Logger;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.backendUrl = this.configService.get<string>('BACKEND_URL');
    this.backendApiKey = this.configService.get<string>('BACKEND_API_KEY');
    this.logger = new Logger(AppController.name);
  }

  @Post()
  async postGame(
    @Body()
    body: {
      playerSymbol: 'ROCK' | 'PAPER' | 'SCISSORS';
      playerName: string;
    },
  ): Promise<{
    playerName: string;
    playerSymbol: 'ROCK' | 'PAPER' | 'SCISSORS';
    opponentSymbol: 'ROCK' | 'PAPER' | 'SCISSORS';
    result: 'PLAYER_WIN' | 'PLAYER_LOSS' | 'DRAW';
    timestamp: Date;
  }> {
    if (this.backendUrl && this.backendApiKey) {
      const { data } = await firstValueFrom(
        this.httpService
          .post(
            this.backendUrl,
            body, // only send the request body
            {
              headers: {
                'X-API-KEY': this.backendApiKey,
              },
            },
          )
          .pipe(
            catchError((error: AxiosError) => {
              // log the received error
              this.logger.error(error?.response?.data);
              // resend the received error as we are only a proxy
              throw new HttpException(
                error?.response?.data as string,
                error?.response?.status || 500,
              );
            }),
          ),
      );
      return data;
    } else {
      // return a 500 in case that this server is not configured properly
      throw new HttpException(
        'An internal error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async getGameRecords(): Promise<
    [
      {
        playerName: string;
        playerSymbol: 'ROCK' | 'PAPER' | 'SCISSORS';
        opponentSymbol: 'ROCK' | 'PAPER' | 'SCISSORS';
        result: 'PLAYER_WIN' | 'PLAYER_LOSS' | 'DRAW';
        timestamp: Date;
      },
    ]
  > {
    if (this.backendUrl && this.backendApiKey) {
      const { data } = await firstValueFrom(
        this.httpService
          .get(this.backendUrl, {
            headers: {
              'X-API-KEY': this.backendApiKey,
            },
          })
          .pipe(
            catchError((error: AxiosError) => {
              // log the received error
              this.logger.error(error?.response?.data);
              // resend the received error
              throw new HttpException(
                // resend the received error as we are only a proxy
                error?.response?.data as string,
                error?.response?.status || 500,
              );
            }),
          ),
      );
      return data;
    } else {
      // return a 500 in case that this server is not configured properly
      throw new HttpException(
        'An internal error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
