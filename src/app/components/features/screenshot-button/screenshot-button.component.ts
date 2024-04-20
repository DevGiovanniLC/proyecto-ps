import {AfterViewInit, Component, ElementRef, inject, Input, ViewChild} from "@angular/core";
import { FormsModule } from '@angular/forms';
import { ScreenshotTaker } from './ScreenshotTaker';
import { AuthService } from "../../auth/sign-up/auth.service";

@Component({
	selector: 'app-screenshot-button',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './screenshot-button.component.html',
	styleUrl: './screenshot-button.component.css',
})
export class ScreenshotButtonComponent {
  @Input() _formatImage: string;
	screenshotTaker: ScreenshotTaker;
	constructor() {
		this.screenshotTaker = new ScreenshotTaker();
	}

	screenshotEvent(): void {
		this.screenshotTaker.take(this._formatImage);
	}
}
