import {inject, Injectable} from '@angular/core';
import {PlayGameResponse} from "./types/play-game-response";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {environment} from "../environments/environment";
import {GetGameRecordsResponse} from "./types/get-game-records-response";
import {GameSymbol} from "./types/game-symbol";

@Injectable({
    providedIn: 'root',
})
export class GameService {
    url = environment.apiUrl;
    private httpClient = inject(HttpClient);

    playGame(symbol: GameSymbol, playerName: string): Observable<PlayGameResponse> {
        // create the request with the player symbol
        const request = {playerSymbol: symbol, playerName: playerName};

        return this.httpClient
            // the API key is added in the NestJS backend for frontend
            .post<PlayGameResponse>(this.url + '/play-game', request)
            .pipe(
                catchError(() => {
                    throw new Error("An error occurred!");
                })
            );
    }

    getGameRecords(): Observable<GetGameRecordsResponse> {
        return this.httpClient
            // the API key is added in the NestJS backend for frontend
            .get<GetGameRecordsResponse>(this.url + '/get-game-records')
            .pipe(
                catchError(() => {
                    throw new Error("An error occurred!");
                })
            );
    }
}
