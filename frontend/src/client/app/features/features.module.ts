import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { DirectivesModule } from '../directives/directives.module';
/**
* Especificamos el modulo
*/

@NgModule({
    imports: [CommonModule, RouterModule, SharedModule, PipesModule, DirectivesModule],
    declarations: [HomeComponent, IndexComponent],
    exports: [CommonModule, FormsModule, RouterModule, HomeComponent, IndexComponent]
})
export class FeaturesModule {
}
