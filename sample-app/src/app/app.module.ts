import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SampleStyleComponent } from './sample-style/sample-style.component';
import { SampleFormComponent } from './sample-form/sample-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { XCommonAutoFormModule } from '../../../src/autoform';


@NgModule({
	declarations: [
		AppComponent,
		SampleStyleComponent,
		SampleFormComponent
	],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		AppRoutingModule,
		XCommonAutoFormModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
