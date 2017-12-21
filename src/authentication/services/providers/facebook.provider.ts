import { Observer } from "rxjs/Observer";
import { Observable } from "rxjs/Observable";
import { IProvider } from "./";
import { IUser, IProviderValue, ProviderType } from "../index";

declare var FB: any;

export class FacebookProvider implements IProvider {

	private url = "/me?fields=name,email,picture";

	constructor(private config: IProviderValue) {
		this.SetUp(this.config);
	}

	public LogIn(): Observable<IUser> {
		return Observable.create((observer: Observer<IUser>) => {
			FB.getLoginStatus((response: any) => {

				if (response.status === "connected") {
					FB.api(this.url, (res: any) => {
						if (!res || res.error) {
							observer.error(res.error);
						} else {
							localStorage.setItem("_login_provider", "facebook");
							observer.next(this.parseUser(response, res));
							observer.complete();
						}
					});

					return;
				}

				FB.login((response2: any) => {
					if (response2.status === "connected") {
						FB.api(this.url, (res: any) => {
							if (!res || res.error) {
								observer.error(res.error);
							} else {
								localStorage.setItem("_login_provider", "facebook");
								observer.next(this.parseUser(response2, res));
								observer.complete();
							}
						});
					}
				}, { scope: "email" });

			});
		});
	}

	public LogOut(): Observable<boolean> {
		return Observable.create((observer: Observer<boolean>) => {
			FB.logout((res: any) => {
				localStorage.removeItem("_login_provider");
				observer.next(true);
				observer.complete();
			});
		});
	}

	private SetUp(config: IProviderValue): void {
		const ref = document.getElementsByTagName("script")[0];
		const fbJs = document.createElement("script");
		fbJs.id = "facebook-jssdk";
		fbJs.async = true;
		fbJs.src = "//connect.facebook.net/en_US/sdk.js";

		fbJs.onload = () => {
			FB.init({
				appId: config.clientId,
				status: true,
				cookie: true,
				xfbml: true,
				version: config.apiVersion
			});
		};

		ref.parentNode.insertBefore(fbJs, ref);
	}

	private parseUser(response: any, res: any): IUser {
		return {
			Name: res.name,
			Email: res.email,
			UID: res.id,
			Provider: ProviderType.Facebook,
			Image: res.picture.data.url,
			Token: response.authResponse.accessToken
		};
	}
}