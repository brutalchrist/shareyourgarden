import { Component } from '@angular/core';

import { MapComponent } from '../../shared/map/map.component';
import { PersonsService } from '../../services/persons/persons.service';
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

    constructor(private personsService: PersonsService) {
    }

    private readyMap(map: MapComponent) {
        this.map = map;
        const self = this;
        this.map.addEventListener('moveend', function(event: any) {
            const polygon = self.map.getBounds();
            polygon.push(polygon[0]);

            self.personsService.getPersonsByPolygon(polygon).subscribe(data => {
                self.map.clear();
                data.forEach((element: any) => {
                    self.map.setMarker(
                        element.gardens[0].location.coordinates[0],
                        element.gardens[0].location.coordinates[1],
                        {
                            click: function (event: any, feature: any) {
                                console.log('event: ', feature.get('opts').data);
                            },
                            data: element
                        }
                    );
                });
            });
        });
    }
}
