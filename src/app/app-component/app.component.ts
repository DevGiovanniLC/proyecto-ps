import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecordButtonComponent } from '../record-button/record-button.component';
import { ScreenshotButtonComponent } from "../screenshot-button/screenshot-button.component";
import { HeaderComponent } from '../header/header.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, RecordButtonComponent, ScreenshotButtonComponent, HeaderComponent],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {}
