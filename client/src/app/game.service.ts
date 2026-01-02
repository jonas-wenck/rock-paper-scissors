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
    apiKey = environment.apiKey;
    private httpClient = inject(HttpClient);

    playGame(symbol: 'ROCK' | 'PAPER' | 'SCISSORS'): Observable<PlayGameResponse> {
        // create the request with the player symbol
        const request = {playerSymbol: symbol};

        return this.httpClient
            .post<PlayGameResponse>(this.url, request, {
                headers: {
                    'X-API-KEY': this.apiKey
                },
            })
            .pipe(
                catchError(() => {
                    throw new Error("An error occurred!");
                })
            );
    }
}
