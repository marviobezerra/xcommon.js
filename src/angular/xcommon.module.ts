import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { XCommonComponents, XCommonServices } from './xcommon.routes';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
	providers: [
		...XCommonServices
	],
    declarations: [
        ...XCommonComponents
    ],
    exports: [
        ...XCommonComponents
    ]
})
export class XCommonModule { }