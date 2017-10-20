import { KeysPipe } from "./pipes/keys.pipe";
import { AutoFormService } from "./services/auto-form.service";
import { HttpUtilService } from "./services/http-util.service";
import { NgModule } from "@angular/core";

@NgModule({
	imports: [
	],
	providers: [
		AutoFormService,
		HttpUtilService
	],
	exports: [
		KeysPipe
	],
	declarations: [
		KeysPipe
	]
})
export class XCommonModule { }