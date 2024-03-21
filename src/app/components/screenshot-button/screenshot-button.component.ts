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
export class ScreenshotButtonComponent implements AfterViewInit {
	screenshotTaker = new ScreenshotTaker();
	@ViewChild('screenshot_button') screenshot_button!: ElementRef;

	ngAfterViewInit(): void {
		if (this.screenshot_button) {
			this.screenshot_button.nativeElement.addEventListener(
				'click',
				(event: Event) => {
					this.screenshotTaker.take();
				}
			);
		}
	}
}
