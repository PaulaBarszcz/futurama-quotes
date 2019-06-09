import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
    baseUrl = 'https://futuramaapi.herokuapp.com/api';

    constructor(private http: HttpClient) { }

    public getQuotes(): Observable<object> {
        // using this url instead of just '/quotes', because '/quotes' returns an array with only 20 quotes 
        // (instead of 163 that it should - probably pagination or problem with API)
        return this.http.get(this.baseUrl + '/quotes/200');
    }
}
