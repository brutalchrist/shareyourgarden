import { Injectable } from '@angular/core';
import { Config } from '../../shared/config/env.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
/**
* This class represents the service component.
*/
@Injectable()
export class RestService {
    private api: string;

    constructor(private http: HttpClient) {
        this.api = Config.API;
    }

    public get(uri: string) {
        const header = this.createHeaders();
        return this.http.get(this.api + uri, {
            headers: header
        });
    }

    private createHeaders() {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return headers;
    }
}
