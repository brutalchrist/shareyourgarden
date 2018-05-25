import { trigger, style, transition, animate } from '@angular/animations';

export let move = trigger('move', [
    transition('void => *', [
        style({transform: 'translateX(100%)'}),
        animate(250)
    ]),
    transition('* => void', [
        animate(250, style({transform: 'translateX(100%)'}))
    ])
]);
