import { NgModule } from '@angular/core';
import { ListCompaniesComponent } from './list.page';
import { CompanyService } from '../../../shared/services/company/company.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ElModule } from 'element-angular'

@NgModule({
	declarations: [
		ListCompaniesComponent
	],
	exports: [
		ListCompaniesComponent
	],
	imports: [
		CommonModule, RouterModule, ElModule
	],
	providers: [
		CompanyService
	]
})
export class ListCompaniesPageModule { }
