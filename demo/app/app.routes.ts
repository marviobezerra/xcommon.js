import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent, HomeComponent } from './components/layout';
import { SampleFlexComponent, FlexElementComponent } from './components/flex';
import { SimpleFormComponent } from './components/form';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'flex', component: SampleFlexComponent },
    { path: 'form', component: SimpleFormComponent }
];

export const AppRoutes = RouterModule.forRoot(routes);

export const AppBoostrap = LayoutComponent;

export const AppComponents = [
    LayoutComponent,
    HomeComponent,
    SampleFlexComponent,
    SimpleFormComponent,
    FlexElementComponent
]