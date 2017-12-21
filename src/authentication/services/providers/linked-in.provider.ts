import { Observer } from "rxjs/Observer";
import { Observable } from "rxjs/Observable";
import { IProvider } from "./";
import { IUser, IProviderValue, ProviderType } from "../index";

declare let IN: any;

export class LinkedInProvider implements IProvider {


	constructor(private config: IProviderValue) {
		this.SetUp(this.config);
	}

	public LogIn(): Observable<IUser> {
		return Observable.create((observer: Observer<IUser>) => {
			IN.User.authorize(() => {
				IN.API.Raw("/people/~:(id,first-name,last-name,email-address,picture-url)").result((res: any) => {
					localStorage.setItem("_login_provider", "linkedin");
					observer.next(this.parseUser(res));
					observer.complete();
				});
			});
		});
	}

	public LogOut(): Observable<boolean> {
		return Observable.create((observer: Observer<boolean>) => {
			IN.User.logout(() => {
				localStorage.removeItem("_login_provider");
				observer.next(true);
				observer.complete();
			}, {});
		});
	}

	private SetUp(config: IProviderValue): void {
		const ref: any = document.getElementsByTagName("script")[0];
		const lIN = document.createElement("script");
		lIN.async = false;
		lIN.src = "//platform.linkedin.com/in.js";
		lIN.text = ("api_key: " + config.clientId).replace("\"", "");
		ref.parentNode.insertBefore(lIN, ref);
	}

	private parseUser(res: any): IUser {
		return {
			Token: "",
			UID: res.id,
			Name: res.firstName + " " + res.lastName,
			Email: res.emailAddress,
			Image: res.pictureUrl,
			Provider: ProviderType.LinkedIn
		};
	}
}