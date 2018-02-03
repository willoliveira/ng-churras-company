import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.page';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ LoginComponent ],
  exports: [ LoginComponent ],
  imports: [ RouterModule ],
  providers: []
})
export class LoginPageModule { }
