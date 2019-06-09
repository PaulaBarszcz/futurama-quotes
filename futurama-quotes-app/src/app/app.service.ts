import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
    private static NUMBER_OF_QUOTES_PER_CHARACTER_IN_MODAL = 5;
    baseUrl = 'https://futuramaapi.herokuapp.com/api';

    constructor(private http: HttpClient) { }

    public getQuotes(): Observable<object> {
        // using this url instead of just '/quotes', because '/quotes' returns an array with only 20 quotes 
        // (instead of 163 that it should - probably pagination or problem with API)
        return this.http.get(this.baseUrl + '/quotes/200');
    }

    public getCharacterQuotes(characterName): Observable<object> {
        return this.http.get(this.baseUrl + `/characters/${characterName}/${AppService.NUMBER_OF_QUOTES_PER_CHARACTER_IN_MODAL}`);
    }
}
