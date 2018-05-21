import { NgModule, ModuleWithProviders } from '@angular/core';
import { MapComponent } from './map/map.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InfoGardenComponent } from './infogarden/infogarden.component';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [MapComponent, InfoGardenComponent],
  exports: [CommonModule, FormsModule, RouterModule, MapComponent, InfoGardenComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
