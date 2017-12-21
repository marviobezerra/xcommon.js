import { NgModule } from "@angular/core";

import { OrderByPipe } from "./pipes/orderby.pipe";
import { KeysPipe } from "./pipes/keys.pipe";
import { TextAreaAutosize } from "./directives/textarea-autogrow.directive";


@NgModule({
	imports: [
	],
	providers: [
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