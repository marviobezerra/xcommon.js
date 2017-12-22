import { NgModule, ModuleWithProviders } from "@angular/core";
import { SocialAuthService } from "./services/social-auth.service";
import { IProvidersConfig } from "./services/provider-config";

declare let IN: any;
declare let FB: any;

@NgModule({
	providers: [SocialAuthService]
})
export class XCommonAuthenticationModule {

	public static forRoot(config: IProvidersConfig): ModuleWithProviders {
		return {
			ngModule: XCommonAuthenticationModule,
			providers: [SocialAuthService, { provide: "config", useValue: config }]
		};
	}

	constructor() {
	}
}