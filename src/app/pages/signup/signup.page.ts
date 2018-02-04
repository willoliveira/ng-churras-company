import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../shared/components/navbar/navbar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupComponent implements OnInit {

  constructor(public navService: NavbarService) { }

  ngOnInit() {
    this.navService.hide();
  }

}
