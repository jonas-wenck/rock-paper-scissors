import {inject, Injectable} from '@angular/core';
import {PlayGameResponse} from "./play-game-response";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class GameService {
    url = environment.apiUrl;
    private httpClient = inject(HttpClient);

    playGame(symbol: 'ROCK' | 'PAPER' | 'SCISSORS', playerName: string): Observable<PlayGameResponse> {
        // create the request with the player symbol
        const request = {playerSymbol: symbol, playerName: playerName};

        return this.httpClient
            // the API key is added in the NestJS backend for frontend
            .post<PlayGameResponse>(this.url, request)
            .pipe(
                catchError(() => {
                    throw new Error("An error occurred!");
                })
            );
    }
}
