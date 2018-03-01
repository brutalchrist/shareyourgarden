import { Injectable, Inject } from '@angular/core';
import { Config } from '../../shared/config/env.config';
import { Observable } from 'rxjs/Observable';

import { RestService } from '../rest/rest.service';

import { HashTable } from '../../classes/hashtable';
/**
* This class represents the service component.
*/
@Injectable()
export class PersonService {
    private persons: HashTable<string, any>;

    constructor(@Inject(RestService) private rest: RestService) {
    }

    public getPersons(): Observable<any> {
        return new Observable(observe => {
            this.rest.get('/person').subscribe(data => {
                observe.next(data);
                observe.complete();
            });
        });
    }
}
