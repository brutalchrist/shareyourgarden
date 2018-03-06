import { Injectable, Inject } from '@angular/core';
import { Config } from '../../shared/config/env.config';
import { Observable } from 'rxjs/Observable';

import { RestService } from '../rest/rest.service';

import { HashTable } from '../../classes/hashtable';
/**
* This class represents the service component.
*/
@Injectable()
export class PersonsService {
    private persons: HashTable<string, any>;

    constructor(@Inject(RestService) private rest: RestService) {
    }

    public getPersons(): Observable<any> {
        return new Observable(observe => {
            this.rest.get('/persons').subscribe(data => {
                observe.next(data);
                observe.complete();
            });
        });
    }

    public getPersonsByPolygon(polygon: number[][]): Observable<any> {
        return new Observable(observe => {
            this.rest.get('/persons?polygon=' + JSON.stringify(polygon)).subscribe(data => {
                observe.next(data);
                observe.complete();
            });
        });
    }
}
