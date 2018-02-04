import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NavbarService } from '../../shared/components/navbar/navbar.service';
import { User } from '../../shared/models/user.model';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.page.html',
	styleUrls: ['./signup.page.scss']
})
export class SignupComponent implements OnInit {
	
	user: User = {
		email: '', 
		password: ''
	};
	signupForm: FormGroup;
	
	constructor(
		private navService: NavbarService, 
		private authService: AuthService,
		private router: Router,
		private fb: FormBuilder) {
	}
	
	ngOnInit() {
		this.navService.hide();

		this.signupForm = this.fb.group({
			email: ['', Validators.required],
			password: ['', Validators.required],
			rePassword: ['', Validators.required]
		});
	}

	samePassword() {

	}

	onSubmit({ email, password }: User) {
		console.log(email, password);
		if (this.signupForm.valid) {
			this.authService.signup({ email, password }).subscribe(respose => {
				this.router.navigate(["/dashboard"]).then(() => {
					this.navService.show();		
				});
			});
		} else {
			Object.keys(this.signupForm.controls).forEach(field => {
				const control = this.signupForm.get(field);
				control.markAsTouched({ onlySelf: true });
			});
		}
	}
	
}
