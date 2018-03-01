import { Component } from '@angular/core';

import { MapComponent } from '../../shared/map/map.component';
import { PersonService } from '../../services/person/person.service';
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

    constructor(private personService: PersonService) {
        this.personService.getPersons().subscribe(data => {
            console.log('data: ', data);
        });
    }

    private readyMap(map: MapComponent) {
        this.map = map;
    }
}
