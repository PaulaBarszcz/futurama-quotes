import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
    baseUrl = 'https://futuramaapi.herokuapp.com/api';

    constructor(private http: HttpClient) { }

    public getQuotes(): Observable<object> {
        return this.http.get(this.baseUrl + '/quotes/200');
    }
}
