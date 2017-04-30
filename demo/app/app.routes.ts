import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent, HomeComponent } from './components/layout';
import { SimpleFlexComponent } from './components/flex';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'flex', component:SimpleFlexComponent }
];

export const AppRoutes = RouterModule.forRoot(routes);

export const AppBoostrap = LayoutComponent;

export const AppComponents = [
    LayoutComponent,
    HomeComponent,
    SimpleFlexComponent
]