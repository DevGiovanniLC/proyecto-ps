import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VideoRecorder } from './VideoRecorder';
import { ScreenshotButtonComponent } from '../screenshot-button/screenshot-button.component';
import { Observer } from './Observer';

@Component({
	selector: 'app-record-button',
	standalone: true,
	imports: [FormsModule, ScreenshotButtonComponent],
	templateUrl: './record-button.component.html',
	styleUrl: './record-button.component.css',
})
export class RecordButtonComponent implements Observer {
	framerate_value: number;
	resolution_value: number;
	videoRecorder: VideoRecorder;
	@ViewChild('record_button') record_button!: ElementRef;

	constructor() {
		this.framerate_value = 60;
		this.resolution_value = 1080;
		this.videoRecorder = new VideoRecorder(
			this.framerate_value,
			this.resolution_value
		);

		this.videoRecorder.addObserver(this);
	}

	async recordEvent(): Promise<void> {
		if (this.videoRecorder.state() == 'recording') {
			this.videoRecorder.stop();
		} else {
			await this.videoRecorder.start();
		}
	}

	public ObsExecute(): void {
		const mediaRecorder = this.videoRecorder.getMediaRecorder();

		mediaRecorder.addEventListener('start', () => {
			this.setRecordingButtonState(true);
		});

		mediaRecorder.addEventListener('dataavailable', () => {
			this.setRecordingButtonState(false);
		});
	}

	private setRecordingButtonState(election: boolean) {
		if (election) {
			this.record_button.nativeElement.style.backgroundImage =
				"url('../../../assets/recording_state.png')";
		} else {
			this.record_button.nativeElement.style.backgroundImage =
				"url('../../../assets/stopped_state.png')";
		}
	}
}
