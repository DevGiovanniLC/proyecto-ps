import { AfterViewInit, Component, ElementRef, inject, ViewChild } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { ScreenshotTaker } from './ScreenshotTaker';
import { AuthService } from "../sign-up/auth.service";

@Component({
	selector: 'app-screenshot-button',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './screenshot-button.component.html',
	styleUrl: './screenshot-button.component.css',
})
export class ScreenshotButtonComponent {
	screenshotTaker: ScreenshotTaker;

	constructor() {
		this.screenshotTaker = new ScreenshotTaker();
	}

	screenshotEvent(): void {
		this.screenshotTaker.take();
	}
}
