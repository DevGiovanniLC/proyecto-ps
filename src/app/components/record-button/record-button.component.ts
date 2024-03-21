import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VideoRecorder } from './VideoRecorder';
import { ScreenshotButtonComponent } from '../screenshot-button/screenshot-button.component';

@Component({
	selector: 'app-record-button',
	standalone: true,
	imports: [FormsModule, ScreenshotButtonComponent],
	templateUrl: './record-button.component.html',
	styleUrl: './record-button.component.css',
})
export class RecordButtonComponent implements AfterViewInit {
	framerate_value: number;
	resolution_value: number;
	videoRecorder: VideoRecorder;
	@ViewChild('record_button') record_button!: ElementRef;

	constructor() {
		this.framerate_value = 60;
		this.resolution_value = 1080;
		this.videoRecorder = new VideoRecorder();
	}

	ngAfterViewInit(): void {
		if (this.record_button.nativeElement) {
			this.record_button.nativeElement.addEventListener(
				'click',
				(event: Event) => {
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
			);
		}
	}
}
