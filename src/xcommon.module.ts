import { NgModule } from "@angular/core";

import { AutoFormService } from "./services/auto-form.service";
import { HttpUtilService } from "./services/http-util.service";
import { OrderByPipe } from "./pipes/orderby.pipe";
import { KeysPipe } from "./pipes/keys.pipe";
import { TextAreaAutosize } from "./directives/textarea-autogrow.directive";


@NgModule({
	imports: [
	],
	providers: [
		AutoFormService,
		HttpUtilService
	],
	exports: [
		KeysPipe,
		OrderByPipe,
		TextAreaAutosize
	],
	declarations: [
		KeysPipe,
		OrderByPipe,
		TextAreaAutosize
	]
})
export class XCommonModule { }