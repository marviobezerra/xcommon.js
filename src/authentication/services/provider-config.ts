import { ProviderType } from './';

export interface IProviderValue {
	clientId: string;
	apiVersion?: string;
}

export type IProvidersConfig = { [provider in ProviderType]?: IProviderValue };