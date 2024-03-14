import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecordButtonComponent } from '../record-button/record-button.component';
import { ScreenshotButtonComponent } from "../screenshot-button/screenshot-button.component";

@Component({
	selector: 'app-root',
	standalone: true,
  imports: [RouterOutlet, RecordButtonComponent, ScreenshotButtonComponent],
	templateUrl: './app.component.html',
})
export class AppComponent {}
