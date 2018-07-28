import { Component } from '@angular/core';

import { MapComponent } from '../../shared/map/map.component';
import { GardensService } from '../../services/gardens/gardens.service';
import { Garden } from '../../classes/garden';
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
    private current_garden: Garden;

    constructor(private gardensService: GardensService) {
    }

    private readyMap(map: MapComponent) {
        this.map = map;
        const self = this;
        this.map.addEventListener('moveend', (event: any) => {
            const polygon = self.map.getBounds();
            polygon.push(polygon[0]);

            self.gardensService.getGardensOfPolygon(polygon).subscribe(data => {
                self.map.clear();
                data.forEach(element => {
                    self.map.setMarker(
                        element.location.coordinates[0],
                        element.location.coordinates[1],
                        {
                            click: (event: any, feature: any) => {
                                if (typeof self.current_garden === 'undefined') {
                                    self.current_garden = new Garden(feature.get('opts').data);
                                } else {
                                    if (self.current_garden.location.coordinates !== feature.get('opts').data.location.coordinates) {
                                        self.current_garden = new Garden(feature.get('opts').data);
                                    } else {
                                        self.current_garden = undefined;
                                    }
                                }
                            },
                            data: element
                        }
                    );
                });
            });
        });
    }

    private close(close: boolean) {
        if (close) {
            this.current_garden = undefined;
        }
    }
}
