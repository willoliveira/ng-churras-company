import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SignupComponent } from './signup.page';
import { AuthService } from '../../shared/services/auth/auth.service';
import { UserService } from '../../shared/services/user/user.service';

@NgModule({
	declarations: [
		SignupComponent
	],
	exports: [
		SignupComponent
	],
	imports: [
		RouterModule,
		ReactiveFormsModule, FormsModule,
		CommonModule
	],
	providers: [
		AuthService, UserService
	]
})
export class SignUpPageModule { }
