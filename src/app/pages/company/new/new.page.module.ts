import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ElModule, ElMessageService } from 'element-angular';
import { TextMaskModule } from 'angular2-text-mask';

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
		RouterModule,
		
		ElModule, TextMaskModule
	],
	providers: [ ElMessageService ]
})
export class NewCompanyPageModule { }
