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
		private navService: NavbarService,
		private authService: AuthService,
		private router: Router
	) { }
	
	ngOnInit() {
		this.user = JSON.parse(localStorage.getItem('user'));
	}

	signOut() {
		this.authService.signout().subscribe(() => {
			console.log(localStorage.getItem("token"))
			this.router.navigate(['/login']);
		});
	}
}
