import { Component, OnInit } from '@angular/core';
import { NavbarService } from './navbar.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
	
	user;

	constructor(
		public navService: NavbarService,
		public authService: AuthService,
		public router: Router
	) { }
	
	ngOnInit() {
		this.user = JSON.parse(localStorage.getItem('user'));
	}

	signOut() {
		this.authService.signout()
		this.router.navigate(['/login']);
	}
}
