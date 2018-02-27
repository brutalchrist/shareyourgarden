import { Injectable } from '@angular/core';

import { HashTable } from '../../classes/hashtable';
import { MapComponent } from '../../shared/map/map.component';

/**
* This class represents the service component.
*/
@Injectable()
export class MapService {
    private maps: HashTable<string, MapComponent>;

    constructor() {
        this.maps = new HashTable<string, MapComponent>();
    }

    public suscribeMap(key: string, map: MapComponent): any {
        this.maps.put(key, map);
    }
}
