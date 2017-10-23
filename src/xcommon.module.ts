import { KeysPipe } from "./pipes/keys.pipe";
import { AutoFormService } from "./services/auto-form.service";
import { HttpUtilService } from "./services/http-util.service";
import { NgModule } from "@angular/core";
import { OrderByPipe } from "./pipes/orderby.pipe";

@NgModule({
	imports: [
	],
	providers: [
		AutoFormService,
		HttpUtilService
	],
	exports: [
		KeysPipe,
		OrderByPipe
	],
	declarations: [
		KeysPipe,
		OrderByPipe
	]
})
export class XCommonModule { }