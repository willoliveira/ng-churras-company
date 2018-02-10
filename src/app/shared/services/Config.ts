export const api_url: String = "http://localhost:3000/api";

export const auth_ignore_urls: Array<String> = [ 
    `${this.api_url}/v1/auth/signin`,
    `${this.api_url}/v1/auth/signup`
];