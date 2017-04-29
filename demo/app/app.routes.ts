import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent, HomeComponent } from './components/layout';


const routes: Routes = [
    { path: '', component: HomeComponent }
];

export const AppRoutes = RouterModule.forRoot(routes);

export const AppBoostrap = LayoutComponent;

export const AppComponents = [
    LayoutComponent,
    HomeComponent
]