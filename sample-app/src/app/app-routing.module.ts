import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SampleFormComponent } from './sample-form/sample-form.component';
import { SampleStyleComponent } from './sample-style/sample-style.component';
import { AppComponent } from './app.component';

const routes: Routes = [
	{ path: '', component: SampleFormComponent },
	{ path: 'style', component: SampleStyleComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
