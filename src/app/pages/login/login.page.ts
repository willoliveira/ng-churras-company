import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { NavbarService } from '../../shared/components/navbar/navbar.service';
import { User } from '../../shared/models/user.model';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { TokenKey } from '../../shared/services/Config';
import { ElMessageService } from 'element-angular';

@Component({
	selector: 'login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss']
})
export class LoginComponent implements OnInit {
	
	user: User = {
		email: '', 
		password: '',
		name: ''
	};
	loginForm: FormGroup;
	
	constructor(
		private navService: NavbarService, 
		private authService: AuthService,
		private router: Router,
		private fb: FormBuilder, 
		private messageService: ElMessageService
	) {
	}
		
	ngOnInit() {
		if(localStorage.getItem(TokenKey)) {
			this.router.navigate(["/dashboard"]);
		}
		this.navService.hide();
		
		this.loginForm = this.fb.group({
			email: ['', Validators.compose([Validators.required, this.RequiredValidator])],
			password: ['', Validators.compose([Validators.required, this.RequiredValidator])]
		});
	}

	statusCtrl(item: string): string {
		if (!this.loginForm.controls[item]) return;
		const control: AbstractControl = this.loginForm.controls[item]
		return control.dirty && control.hasError('status') ? control.errors.status : ''
	}
	
	messageCtrl(item: string): string {
		if (!this.loginForm.controls[item]) return;
		const control: AbstractControl = this.loginForm.controls[item]
		return control.dirty && control.hasError('message') ? control.errors.message : ''
	}
	
	RequiredValidator(control: FormControl) {
		if (control.dirty && (typeof control.value === 'undefined' || control.value === "")) {
			return { status: 'error', message: 'Valor é requirido' };
		}
		return {  };
	}
	
	onSubmit(user: User) {
		if (this.loginForm.valid) {
			this.authService.signin(user).subscribe(respose => {
				this.router.navigate(["/dashboard"]).then(() => {
					this.navService.show();
				});
			}, () => {
				this.messageService.error("Usuário ou senha incorretos");
			});
		} else {
			Object.keys(this.loginForm.controls).forEach(field => {
				const control = this.loginForm.get(field);
				control.markAsTouched({ onlySelf: true });
			});
		}
	}
}
	