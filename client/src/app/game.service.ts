import {inject, Injectable} from '@angular/core';
import {PlayGameResponse} from "./play-game-response";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";

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
                catchError(() => {
                    throw new Error("An error occurred!");
                })
            );
    }
}
