import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ListCompaniesPageModule } from './pages/company/list/list.page.module';
import { NewCompanyPageModule } from './pages/company/new/new.page.module';
import { LoginPageModule } from './pages/login/login.page.module';
import { DashboardPageModule } from './pages/dashboard/dashboard.page.module';
import { SignUpPageModule } from './pages/signup/signup.page.module';
import { ListOrdersPageModule } from './pages/orders/list/list.page.module';
import { NewOrderPageModule } from './pages/orders/new/new.page.module';
import { AccountPageModule } from './pages/account/account.page.module';


import { LoginComponent } from './pages/login/login.page';
import { DashboardComponent } from './pages/dashboard/dashboard.page';
import { NewCompanyComponent } from './pages/company/new/new.page';
import { ListOrdersComponent } from './pages/orders/list/list.page';
import { NewOrderComponent } from './pages/orders/new/new.page';
import { AccountComponent } from './pages/account/account.page';
import { SignupComponent } from './pages/signup/signup.page';
import { ListCompaniesComponent } from './pages/company/list/list.page';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'company/new', component: NewCompanyComponent },
  { path: 'company/list', component: ListCompaniesComponent },
  { path: 'order/new', component: NewOrderComponent },
  { path: 'order/list', component: ListOrdersComponent },
  { path: 'account', component: AccountComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserModule, 

    LoginPageModule, SignUpPageModule,
    DashboardPageModule,
    AccountPageModule, 
    
    ListCompaniesPageModule, NewCompanyPageModule,
    ListOrdersPageModule, NewOrderPageModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
