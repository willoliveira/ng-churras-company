import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { NavbarService } from '../../shared/components/navbar/navbar.service';
import { User } from '../../shared/models/user.model';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../shared/services/user/user.service';
import { TokenKey } from '../../shared/services/Config';
import { ElMessageService } from 'element-angular';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.page.html',
	styleUrls: ['./signup.page.scss']
})
export class SignupComponent implements OnInit {
	action = "";
	sub: Subscription;
	waitRequest = false;
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
		private fb: FormBuilder,
		private messageService: ElMessageService
	) {
	}
	
	ngOnInit() {
		this.navService.hide();
		this.sub = this.route.data.subscribe(params => {
			if (params.action) {
				this.action = params.action;
			}
			if(localStorage.getItem(TokenKey)) {
				this.navService.show();
				this.action = 'update';
				this.userService.getUser().subscribe((data) => {
					this.createFormGroup(data);
				});
			} else {
				this.createFormGroup({});
			}

		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	isCreateMode() {
		return this.action === "create";
	}
	
	createFormGroup(data?) {
		this.signupForm = this.fb.group({
			email: [data.email || '', Validators.compose([Validators.required, this.RequiredValidator])],
			name: [data.name || '', Validators.compose([Validators.required, this.RequiredValidator])],
			password: ['', Validators.compose([Validators.required, this.RequiredValidator])],
			rePassword: ['', Validators.compose([Validators.required, this.RequiredValidator, this.PasswordValidator.bind(this, 'password', 'rePassword')])]
		});
	}

	statusCtrl(item: string): string {
		if (!this.signupForm.controls[item]) return
		const control: AbstractControl = this.signupForm.controls[item]
		return control.dirty && control.hasError('status') ? control.errors.status : ''
	}
	
	messageCtrl(item: string): string {
		if (!this.signupForm.controls[item]) return
		const control: AbstractControl = this.signupForm.controls[item]
		return control.dirty && control.hasError('message') ? control.errors.message : ''
	}
	
	RequiredValidator(control: FormControl) {
		if (control.dirty && (typeof control.value === 'undefined' || control.value === "")) {
			return { status: 'error', message: 'Valor é requirido' };
		}
		return {  };
	}

	PasswordValidator(password: string, rePassword: string, control: FormControl) {
		if (this.signupForm && control.dirty) {
			if (this.signupForm.controls[password].value !== this.signupForm.controls[rePassword].value) {
				return { status: 'error', message: 'Password deve ser igual' };
			}
		}
		return {  };
	}

	onSubmit({ email, name, password }: User) {
		if (this.signupForm.valid) {
			this.waitRequest = true;
			let user = { email, name, password };
			if (this.action === "update") {
				this.userService.updateUser(user).subscribe(this.onSubmitSuccess.bind(this), this.onError.bind(this));
			} else {
				this.authService.signup(user).subscribe(this.onSubmitSuccess.bind(this), this.onError.bind(this));
			}
		} else {
			Object.keys(this.signupForm.controls).forEach(field => {
				const control = this.signupForm.get(field);
				control.markAsDirty({ onlySelf: true });
			});
		}
	}

	
	onSubmitSuccess(respose) {
		this.waitRequest = false;
		let msg = this.action === 'update' ? "Usuário atualizado com sucesso" : "Usuário cadastrado com sucesso"
		this.messageService.success(msg);
		this.router.navigate(["/dashboard"]).then(() => {
			this.navService.show();
		});
	}
	
	onError() {
		this.waitRequest = false;
		let msg = this.action === 'update' ? "Erro ao atualizar usuário" : "Erro ao cadastrar usuário";
		this.messageService.error(msg);
	}
}
