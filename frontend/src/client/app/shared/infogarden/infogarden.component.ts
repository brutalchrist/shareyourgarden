import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Garden } from '../../classes/garden';
import { move } from '../../animations';

declare var ol: any;

/**
* This class represents the main application component.
*/
@Component({
    moduleId: module.id,
    selector: 'sd-infogarden',
    templateUrl: 'infogarden.component.html',
    styleUrls: ['infogarden.component.css'],
    animations: [move]
})

export class InfoGardenComponent {
    @Input() garden: Garden;
    @Output() closeemitter = new EventEmitter<boolean>();

    close() {
        this.closeemitter.emit(true);
    }
}
