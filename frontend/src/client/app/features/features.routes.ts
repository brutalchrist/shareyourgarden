import { Route } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { HomeComponent } from './home/home.component';

export const FeaturesRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: '',
        component: IndexComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            }
        ],
        //ROUTER CHILDREN LIMIT (NOT REMOVE - CLI COMPONENT)
        canActivate: []
    }
];
