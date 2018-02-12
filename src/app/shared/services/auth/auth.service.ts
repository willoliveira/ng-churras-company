import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';

import { Observable } from 'rxjs/Observable'
import { tap, map } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import { api_url, TokenKey } from '../Config';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {
	
	constructor(
		private http: HttpClient,
		private router: Router
	) { }
	
	validate() {
		return this.http
			.post(`${api_url}/v1/auth/validate`, { 
				token: localStorage.getItem(TokenKey) 
			})
			.pipe(
				map((response) => response["content"].valid)
			)
		;
	}
	
	signin(user: User): Observable<any> {
		return this.http
			.post(`${api_url}/v1/auth/signin`, user)
			.pipe(
				tap(({ content }) => {
					localStorage.setItem(TokenKey, content.token); 
					localStorage.setItem("user", JSON.stringify(content.user)); 
				})
			)
	}

	signup(user: User): Observable<any> {
		return this.http.post(`${api_url}/v1/auth/signup`, user)
			.pipe(
				tap(({ content }) => {
					localStorage.setItem(TokenKey, content.token); 
					localStorage.setItem("user", JSON.stringify(content.user)); 
				})
			);
	}

	signout() {
		localStorage.removeItem("user");
		localStorage.removeItem(TokenKey);
		return Observable.of();
	}
}
