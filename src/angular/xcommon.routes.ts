import { Routes, RouterModule } from '@angular/router';
import { IconComponent, IconListComponent } from './components/icon';
import { AutoFormService, IconService } from './services';

export const XCommonServices = [
	AutoFormService,
	IconService
]

export const XCommonComponents = [
    IconComponent,
	IconListComponent
]

export const routes: Routes = [
    { path: 'icon-list', component: IconListComponent }
];

export const XCommonRoutes = RouterModule.forRoot(routes);