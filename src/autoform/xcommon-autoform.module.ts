import { NgModule } from "@angular/core";

import { AutoFormService } from "./services/auto-form.service";
import { HttpUtilService } from "./services/http-util.service";

@NgModule({
	imports: [
	],
	providers: [
		AutoFormService,
		HttpUtilService
	],
	exports: [
	],
	declarations: [
	]
})
export class XCommonAutoFormModule { }