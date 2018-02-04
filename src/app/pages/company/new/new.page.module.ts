import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NewCompanyComponent } from './new.page';

@NgModule({
	declarations: [
		NewCompanyComponent
	],
	exports: [
		NewCompanyComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule, FormsModule,
		RouterModule
	],
	providers: []
})
export class NewCompanyPageModule { }
