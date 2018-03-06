import { Injectable, Inject } from '@angular/core';
import { Config } from '../../shared/config/env.config';
import { Observable } from 'rxjs/Observable';

import { RestService } from '../rest/rest.service';
import { Garden } from '../../classes/garden';
/**
* This class represents the service component.
*/
@Injectable()
export class GardensService {
    constructor(@Inject(RestService) private rest: RestService) {
    }

    public getGardensOfPolygon(polygon: number[][]): Observable<Garden[]> {
        return new Observable(observe => {
            this.rest.get('/gardens?polygon=' + JSON.stringify(polygon)).subscribe((data: any[]) => {
                let gardens: Garden[] = [];

                data.forEach((element: Garden) => {
                    gardens.push(new Garden(element));
                });
                
                observe.next(gardens);
                observe.complete();
            });
        });
    }
}
