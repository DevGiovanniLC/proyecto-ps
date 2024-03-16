import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VideoRecorder } from './VideoRecorder';

@Component({
	selector: 'app-record-button',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './record-button.component.html',
	styleUrl: './record-button.component.css',
})
export class RecordButtonComponent {
	framerate_value: number = 60;
	resolution_value: number = 1080;
	videoRecorder = new VideoRecorder();

	ngAfterViewInit(): void {
		const record_button = document.getElementById('record-button');

		if (record_button) {
			record_button.addEventListener('click', (event) => {
				if (this.videoRecorder.isRecording()) {
					this.videoRecorder.stop();
				} else {
					this.videoRecorder.start(
						this.framerate_value,
						this.resolution_value
					);
				}
			});
		}
	}
}
