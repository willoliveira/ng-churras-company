import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
				this.createFormGroup();
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
			email: [data.email || '', Validators.required],
			name: [data.name || '', Validators.required],
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
				this.userService.updateUser(user).subscribe(this.onSubmitSuccess.bind(this), this.onError.bind(this));
			} else {
				this.authService.signup(user).subscribe(this.onSubmitSuccess.bind(this), this.onError.bind(this));
			}
		} else {
			Object.keys(this.signupForm.controls).forEach(field => {
				const control = this.signupForm.get(field);
				control.markAsTouched({ onlySelf: true });
			});
		}
	}

	
	onSubmitSuccess(respose) {
		let msg = this.action === 'update' ? "Usuário atualizado com sucesso" : "Usuário cadastrado com sucesso"
		this.messageService.success(msg);
		this.router.navigate(["/dashboard"]).then(() => {
			this.navService.show();
		});
	}
	
	onError() {
		let msg = this.action === 'update' ? "Erro ao atualizar usuário" : "Erro ao cadastrar usuário";
		this.messageService.error(msg);
	}
}
