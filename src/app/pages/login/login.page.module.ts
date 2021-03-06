import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 

import { LoginComponent } from './login.page';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth/auth.service';

import { ElModule } from 'element-angular';

@NgModule({
	declarations: [ LoginComponent ],
	exports: [ LoginComponent ],
	imports: [ 
		CommonModule,
		ReactiveFormsModule, FormsModule,
		RouterModule,

		ElModule.forRoot()
	],
	providers: [
		AuthService
	]
})
export class LoginPageModule { }
