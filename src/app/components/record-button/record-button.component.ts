import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VideoRecorder } from './VideoRecorder';
import { ScreenshotButtonComponent } from '../screenshot-button/screenshot-button.component';
import { OptionsComponent } from '../../options/options.component';

@Component({
	selector: 'app-record-button',
	standalone: true,
	imports: [FormsModule, ScreenshotButtonComponent, OptionsComponent],
	templateUrl: './record-button.component.html',
	styleUrl: './record-button.component.css',
})
export class RecordButtonComponent {
	framerate_value: number;
	resolution_value: number;
	videoRecorder: VideoRecorder;
	@ViewChild('record_button') record_button!: ElementRef;

	constructor() {
		this.framerate_value = 60;
		this.resolution_value = 1080;
		this.videoRecorder = new VideoRecorder();
	}

	recordEvent(): void {
		if (this.videoRecorder.isRecording()) {
			this.videoRecorder.stop();
		} else {
			this.videoRecorder.start(
				this.framerate_value,
				this.resolution_value,
				this.record_button.nativeElement
			);
		}
	}
}
