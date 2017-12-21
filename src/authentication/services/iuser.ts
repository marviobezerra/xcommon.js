import { ProviderType } from "./provider-type";

export interface IUser {
	Token: string;
	UID: string;
	Name: string;
	Email: string;
	Image: string;
	Provider: ProviderType;
}