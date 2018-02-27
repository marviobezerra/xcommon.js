import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { IProvidersConfig, IProviderValue, ProviderType, IUser } from './index';
import { IProvider, LinkedInProvider, FacebookProvider, GoogleProvider } from './providers/index';
import { debug } from 'util';

type Providers = {[provider in ProviderType]?: IProvider };

@Injectable()
export class SocialAuthService {

	private Providers: Providers = {};
	private Started = false;

	constructor( @Inject('config') private config: IProvidersConfig) {
		this.loadProviders(config);
	}

	public login(provider: ProviderType): Observable<IUser> {

		const providerDefinition = this.Providers[provider];

		if (!providerDefinition) {
			throw new Error('Invalid provider: ' + provider);
		}

		return providerDefinition.LogIn();
	}

	public logout(): Observable<boolean> {

		const provider = localStorage.getItem('_login_provider');

		switch (provider) {
			case 'google':
				return this.Providers.Google.LogOut();
			case 'facebook':
				return this.Providers.Facebook.LogOut();
			case 'linkedin':
				return this.Providers.LinkedIn.LogOut();
			default:
				throw new Error('Invalid provider: ' + provider);
		}
	}

	private loadProviders(config: IProvidersConfig): void {

		if (this.Started) {
			return;
		}

		if (config.Google) {
			this.Providers.Google = new GoogleProvider(config.Google);
		}

		if (config.Facebook) {
			this.Providers.Facebook = new FacebookProvider(config.Facebook);
		}

		if (config.LinkedIn) {
			this.Providers.LinkedIn = new LinkedInProvider(config.LinkedIn);
		}

		this.Started = true;
	}
}