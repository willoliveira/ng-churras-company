import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { NavbarService } from '../../shared/components/navbar/navbar.service';
import { User } from '../../shared/models/user.model';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../shared/services/user/user.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.page.html',
	styleUrls: ['./signup.page.scss']
})
export class SignupComponent implements OnInit {
	action = "";
	sub: Subscription;
	user: User = {
		email: '', 
		password: '',
		name: ''
	};
	signupForm: FormGroup;
	
	constructor(
		private route: ActivatedRoute,
		private navService: NavbarService, 
		private authService: AuthService,
		private userService: UserService,
		private router: Router,
		private fb: FormBuilder) {
	}
	
	ngOnInit() {
		this.navService.hide();
		this.sub = this.route.data.subscribe(params => {
			console.log(params)
			if (params.action) {
				this.action = params.action;
			}

			this.createFormGroup();
		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	isCreateMode() {
		return this.action === "create";
	}
	
	createFormGroup() {
		this.signupForm = this.fb.group({
			email: ['', Validators.required],
			name: ['', Validators.required],
			password: ['', Validators.required],
			rePassword: ['', Validators.required]
		});
	}

	//TODO:
	samePassword() {

	}

	onSubmit({ email, name, password }: User) {
		if (this.signupForm.valid) {
			let user = { email, name, password };
			if (this.action === "update") {
				this.userService.updateUser(user).subscribe(this.onSubmitSuccess);
			} else {
				this.authService.signup(user).subscribe(this.onSubmitSuccess);
			}
		} else {
			Object.keys(this.signupForm.controls).forEach(field => {
				const control = this.signupForm.get(field);
				control.markAsTouched({ onlySelf: true });
			});
		}
	}

	onSubmitSuccess(respose) {
		if (this.action === "create") {
			this.router.navigate(["/dashboard"]).then(() => {
				this.navService.show();
			});
		}
	}
	
}
