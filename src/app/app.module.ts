import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { ElModule } from 'element-angular';

import { AppComponent } from './app.component';

// Pages modules
import { LoginPageModule } from './pages/login/login.page.module';
import { ListCompaniesPageModule } from './pages/company/list/list.page.module';
import { NewCompanyPageModule } from './pages/company/new/new.page.module';
import { DashboardPageModule } from './pages/dashboard/dashboard.page.module';
import { SignUpPageModule } from './pages/signup/signup.page.module';
import { ListOrdersPageModule } from './pages/orders/list/list.page.module';
import { NewOrderPageModule } from './pages/orders/new/new.page.module';
import { AccountPageModule } from './pages/account/account.page.module';

// Pages
import { LoginComponent } from './pages/login/login.page';
import { DashboardComponent } from './pages/dashboard/dashboard.page';
import { NewCompanyComponent } from './pages/company/new/new.page';
import { ListOrdersComponent } from './pages/orders/list/list.page';
import { NewOrderComponent } from './pages/orders/new/new.page';
import { AccountComponent } from './pages/account/account.page';
import { SignupComponent } from './pages/signup/signup.page';
import { ListCompaniesComponent } from './pages/company/list/list.page';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

import { NavbarService } from './shared/components/navbar/navbar.service';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { InjectTokenProvider } from './shared/services/auth/auth.interceptor';

import 'element-angular/theme/index.css';
import { AuthGuard } from './shared/services/auth/auth.guard';
import { AuthService } from './shared/services/auth/auth.service';

export const appRoutes: Routes = [
	{ path: 'login', component: LoginComponent, data: { action: 'signin' } },
	{ path: 'signup', component: SignupComponent, data: { action: 'create' } },
	{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
	{ path: 'company/new', component: NewCompanyComponent, canActivate: [AuthGuard] },
	{ path: 'company/list', component: ListCompaniesComponent, canActivate: [AuthGuard] },
	{ path: 'order/new', component: NewOrderComponent, canActivate: [AuthGuard] },
	{ path: 'order/list', component: ListOrdersComponent, canActivate: [AuthGuard] },
	{ path: 'account', component: SignupComponent, canActivate: [AuthGuard], data: { action: 'update' }  },
	{ path: '', redirectTo: '/login', pathMatch: 'full' }
]

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent
	],
	imports: [
		CommonModule,
		BrowserModule,
		RouterModule.forRoot(appRoutes, { 
			enableTracing: false 
		}),
		BrowserAnimationsModule,
		
		ElModule.forRoot(),

		LoginPageModule, SignUpPageModule,
		DashboardPageModule,
		AccountPageModule, 
		
		ListCompaniesPageModule, NewCompanyPageModule,
		ListOrdersPageModule, NewOrderPageModule
	],
	providers: [
		NavbarService, InjectTokenProvider, AuthGuard, AuthService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
