import { NgModule } from '@angular/core';
import { ListCompaniesComponent } from './list.page';
import { CompanyService } from '../../../shared/services/company/company.service';

@NgModule({
	declarations: [
		ListCompaniesComponent
	],
	exports: [
		ListCompaniesComponent
	],
	imports: [
		
	],
	providers: [
		CompanyService
	]
})
export class ListCompaniesPageModule { }
