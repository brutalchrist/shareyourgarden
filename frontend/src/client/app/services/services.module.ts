import { NgModule } from '@angular/core';
import { GardensService } from './gardens/gardens.service';
import { RestService } from './rest/rest.service';
import { MapService } from './map/map.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
/**
* Especificamos el modulo
*/

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [],
    providers:[MapService, RestService, GardensService],
    exports: [CommonModule, FormsModule, RouterModule]
})
export class ServicesModule {
}
