import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet,NavigationEnd,Router } from '@angular/router';
import { RecordButtonComponent } from './record-button/record-button.component';
import { HeaderComponent } from './header/header.component';
import { WhoweareComponent } from './whoweare/whoweare.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet,RouterLink, RecordButtonComponent, HeaderComponent,WhoweareComponent],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	showLandingPage: boolean = true;
	constructor(private router: Router) {
		this.router.events.subscribe((event) => {
		  if (event instanceof NavigationEnd) {
			// Si la ruta es diferente a la ruta de la landing page, ocultarla
			this.showLandingPage = (event.url !== '/');
		  }
		});
	}
}
