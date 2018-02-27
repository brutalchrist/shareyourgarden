import { Component } from '@angular/core';

import { MapComponent } from '../../shared/map/map.component';
/**
* This class represents the main application component.
*/
@Component({
    moduleId: module.id,
    selector: 'sd-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent {
    private map: MapComponent;

    private readyMap(map: MapComponent) {
        this.map = map;
    }
}
