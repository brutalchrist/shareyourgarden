import { Component } from '@angular/core';

import { MapComponent } from '../../shared/map/map.component';
import { GardensService } from '../../services/gardens/gardens.service';
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

    constructor(private gardensService: GardensService) {
    }

    private readyMap(map: MapComponent) {
        this.map = map;
        const self = this;
        this.map.addEventListener('moveend', function(event: any) {
            const polygon = self.map.getBounds();
            polygon.push(polygon[0]);

            self.gardensService.getGardensOfPolygon(polygon).subscribe(data => {
                self.map.clear();
                data.forEach(element => {
                    self.map.setMarker(
                        element.location.coordinates[0],
                        element.location.coordinates[1],
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
