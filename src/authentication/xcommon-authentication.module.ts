import { NgModule, ModuleWithProviders } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { IProvidersConfig } from "./services/provider-config";

declare let IN: any;
declare let FB: any;

@NgModule({
	providers: [AuthService]
})
export class XCommonAuthenticationModule {

	public static forRoot(config: IProvidersConfig): ModuleWithProviders {
		return {
			ngModule: XCommonAuthenticationModule,
			providers: [AuthService, { provide: "config", useValue: config }]
		};
	}
}