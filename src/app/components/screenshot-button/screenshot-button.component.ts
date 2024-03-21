import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VideoRecorder } from '../record-button/VideoRecorder';
import { ScreenshotTaker } from './ScreenshotTaker';

@Component({
	selector: 'app-screenshot-button',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './screenshot-button.component.html',
	styleUrl: './screenshot-button.component.css',
})
export class ScreenshotButtonComponent implements OnInit {
	screenshotTaker = new ScreenshotTaker();

	ngOnInit(): void {
		const record_button = document.getElementById('screenshot-button');

		if (record_button) {
			record_button.addEventListener('click', (event) => {
				this.screenshotTaker.take();
			});
		}
	}
}
