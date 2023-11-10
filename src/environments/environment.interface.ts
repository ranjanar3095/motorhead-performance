export interface IBuildEnvironment {
	production: boolean;
	mock: boolean;
	baseUrl: string;
	oidc: boolean;
	envName: string;
	base: string;
}
