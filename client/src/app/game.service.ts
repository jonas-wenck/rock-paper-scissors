import {inject, Injectable} from '@angular/core';
import {PlayGameResponse} from "./play-game-response";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, share} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class GameService {
    url = 'http://localhost:8080/rock-paper-scissors/play-game';
    private httpClient = inject(HttpClient);

    playGame(symbol: 'ROCK' | 'PAPER' | 'SCISSORS'): Observable<PlayGameResponse> {
        // create the request with the player symbol
        const request = {playerSymbol: symbol};

        return this.httpClient
            .post<PlayGameResponse>(this.url, request)
            .pipe(
                // share the observable so that we can subscribe to it more than once
                // without this, the second subscription would trigger a new HTTP request
                share(),
                catchError(() => {
                    throw new Error("An error occurred!");
                })
            );
    }
}
