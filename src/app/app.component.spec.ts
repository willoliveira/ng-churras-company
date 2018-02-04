import { TestBed, async } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from "@angular/router/testing";

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

// Pages modules
import { LoginPageModule } from './pages/login/login.page.module';
import { ListCompaniesPageModule } from './pages/company/list/list.page.module';
import { NewCompanyPageModule } from './pages/company/new/new.page.module';
import { DashboardPageModule } from './pages/dashboard/dashboard.page.module';
import { SignUpPageModule } from './pages/signup/signup.page.module';
import { ListOrdersPageModule } from './pages/orders/list/list.page.module';
import { NewOrderPageModule } from './pages/orders/new/new.page.module';
import { AccountPageModule } from './pages/account/account.page.module';

import { NavbarService } from './shared/components/navbar/navbar.service';

import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './app.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavbarComponent
      ],
      imports: [
        CommonModule,
        BrowserModule,
        RouterTestingModule.withRoutes(appRoutes, { 
          enableTracing: false 
        }),
    
        LoginPageModule, SignUpPageModule,
        DashboardPageModule,
        AccountPageModule, 
        
        ListCompaniesPageModule, NewCompanyPageModule,
        ListOrdersPageModule, NewOrderPageModule,
        
      ],
      providers: [
        NavbarService
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  // it(`should have as title 'app'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app');
  // }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  // }));
});
