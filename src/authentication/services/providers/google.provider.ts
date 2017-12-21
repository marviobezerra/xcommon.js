import { Observer } from "rxjs/Observer";
import { Observable } from "rxjs/Observable";
import { IProvider } from "./";
import { IUser, IProviderValue, ProviderType } from "../index";

declare var gapi: any;

export class GoogleProvider implements IProvider {

	private gauth: any;

	constructor(private config: IProviderValue) {
		this.SetUp(config);
	}

	public LogIn(): Observable<IUser> {

		return Observable.create((observer: Observer<IUser>) => {
			if (!this.gauth) {
				this.gauth = gapi.auth2.getAuthInstance();
			}
			if (!this.gauth.isSignedIn.get()) {
				this.gauth.signIn().then(() => {
					localStorage.setItem("_login_provider", "google");
					observer.next(this.parseUser());
					observer.complete();
				});
			} else {
				localStorage.setItem("_login_provider", "google");
				observer.next(this.parseUser());
				observer.complete();
			}
		});
	}

	public LogOut(): Observable<boolean> {
		return Observable.create((observer: Observer<boolean>) => {
			const gElement = document.getElementById("gSignout");
			if (gElement) {
				gElement.remove();
			}

			const ref = document.getElementsByTagName("script")[0];
			const gSignout = document.createElement("script");
			gSignout.src = "https://accounts.google.com/Logout";
			gSignout.type = "text/javascript";
			gSignout.id = "gSignout";
			localStorage.removeItem("_login_provider");

			ref.parentNode.insertBefore(gSignout, ref);

			observer.next(true);
			observer.complete();
		});
	}

	private SetUp(config: IProviderValue): void {
		const ref = document.getElementsByTagName("script")[0];
		const gJs = document.createElement("script");
		gJs.async = true;
		gJs.src = "//apis.google.com/js/platform.js";

		gJs.onload = () => {
			gapi.load("auth2", () => {
				gapi.auth2.init({
					client_id: config.clientId,
					scope: "https://www.googleapis.com/auth/user.birthday.read"
				});
			});
		};
		ref.parentNode.insertBefore(gJs, ref);
	}

	private parseUser(): IUser {
		const currentUser = this.gauth.currentUser.get();
		const profile = currentUser.getBasicProfile();
		const idToken = currentUser.getAuthResponse().id_token;
		const accessToken = currentUser.getAuthResponse().access_token;

		return {
			Token: accessToken,
			UID: profile.getId(),
			Name: profile.getName(),
			Email: profile.getEmail(),
			Image: profile.getImageUrl(),
			Provider: ProviderType.Google
		};
	}
}