import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DashboardComponent } from './dashboard.page';
import { RouterModule } from '@angular/router';
import { CompanyService } from '../../shared/services/company/company.service';


@NgModule({
	declarations: [
		DashboardComponent
	],
	exports: [
		DashboardComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		HttpClientModule
	],
	providers: [
		CompanyService
	]
})
export class DashboardPageModule { }
