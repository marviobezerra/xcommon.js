import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SampleFormComponent } from './sample-form/sample-form.component';

import { XCommonAutoFormModule } from '../../../src/autoform';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		AppComponent,
		SampleFormComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		XCommonAutoFormModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
