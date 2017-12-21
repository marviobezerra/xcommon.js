import { IProviderValue } from "./../provider-config";
import { IUser } from "./../iuser";
import { Observable } from "rxjs/Observable";

export interface IProvider {
	LogIn(): Observable<IUser>;
	LogOut(): Observable<boolean>;
}