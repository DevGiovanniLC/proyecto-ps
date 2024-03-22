import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScreenshotTaker } from './ScreenshotTaker';

@Component({
	selector: 'app-screenshot-button',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './screenshot-button.component.html',
	styleUrl: './screenshot-button.component.css',
})
export class ScreenshotButtonComponent {
	screenshotTaker: ScreenshotTaker

	constructor(){
		this.screenshotTaker = new ScreenshotTaker()
	}

	screenshotEvent(): void {
		this.screenshotTaker.take();
	}
}
