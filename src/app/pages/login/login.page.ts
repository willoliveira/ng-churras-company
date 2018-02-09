import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NavbarService } from '../../shared/components/navbar/navbar.service';
import { User } from '../../shared/models/user.model';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss']
})
export class LoginComponent implements OnInit {
	
	user: User = {
		email: '', 
		password: ''
	};
	loginForm: FormGroup;
	
	constructor(
		private navService: NavbarService, 
		private authService: AuthService,
		private router: Router,
		private fb: FormBuilder) {
	}
		
	ngOnInit() {
		this.navService.hide();
		
		this.loginForm = this.fb.group({
			email: ['', Validators.required],
			password: ['', Validators.required]
		});
	}
	
	onSubmit(user: User) {
		if (this.loginForm.valid) {
			this.authService.signin(user).subscribe(respose => {
				this.router.navigate(["/dashboard"]).then(() => {
					this.navService.show();		
				});
			});
		} else {
			Object.keys(this.loginForm.controls).forEach(field => {
				const control = this.loginForm.get(field);
				control.markAsTouched({ onlySelf: true });
			});
		}
	}
}
	