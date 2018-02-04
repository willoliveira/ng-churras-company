import { NgModule } from '@angular/core';
import { SignupComponent } from './signup.page';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SignupComponent
  ],
  exports: [
    SignupComponent
  ],
  imports: [
    RouterModule
  ],
  providers: []
})
export class SignUpPageModule { }
