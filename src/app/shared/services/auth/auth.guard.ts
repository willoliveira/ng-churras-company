import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable'
import { map, first, take } from 'rxjs/operators';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {
	
	constructor(
		private authService: AuthService,
		private router: Router
	) {}
	
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		return this.authService
			.validate()
			.map(valid => {
				if (!valid) {
					this.router.navigate(['/login']);
				}
				return valid;
			})
			.first();
	}
}