export const api_url: String = "https://churras-node-api.herokuapp.com/api";

export const TokenKey: string = "token";

export const auth_ignore_urls: Array<String> = [ 
    `${this.api_url}/v1/auth/signin`,
    `${this.api_url}/v1/auth/signup`,
    `${this.api_url}/v1/auth/validate`
];