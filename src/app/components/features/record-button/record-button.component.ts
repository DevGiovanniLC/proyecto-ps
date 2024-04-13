import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VideoRecorder } from './VideoRecorder';
import { ScreenshotButtonComponent } from '../screenshot-button/screenshot-button.component';
import { OptionsComponent } from '../options/options.component';
import { NextObserver } from 'rxjs';
import { CounterDown } from './CounterDown';

@Component({
	selector: 'app-record-button',
	standalone: true,
	imports: [FormsModule, ScreenshotButtonComponent, OptionsComponent],
	templateUrl: './record-button.component.html',
	styleUrl: './record-button.component.css',
})
export class RecordButtonComponent implements NextObserver<any> {
	@ViewChild('record_button') record_button: ElementRef;
	@ViewChild('micro_button') micro_button: ElementRef;

	videoRecorder: VideoRecorder;

	microState: boolean;
	recordState: string;

	@Input() framerate: number;
	@Input() resolution: number;
	@Input() delay: number;

	constructor() {
		this.recordState = 'RECORD';
		this.microState = true;
	}

	ngOnInit(): void {
		this.videoRecorder = new VideoRecorder();
		this.videoRecorder.subscribe(this);
	}

	async recordEvent(): Promise<void> {
		if (this.videoRecorder.state() == 'recording') {
			this.videoRecorder.stop();
		} else {
			this.videoRecorder.microphone(this.microState);
			this.videoRecorder.start(
				this.framerate,
				this.resolution,
				this.delay
			);
		}
	}

	next(data: any): void {
		if (typeof data === 'number') {
			this.countDownEvents(data);
			return;
		}

		if (data instanceof MediaRecorder) {
			this.mediaRecorderEvents(data);
			return;
		}
	}

	private mediaRecorderEvents(mediaRecorder: MediaRecorder) {
		mediaRecorder.addEventListener('start', async () => {
			this.record_button.nativeElement.style.backgroundImage =
				"url('/assets/recording_state.png')";
			this.micro_button.nativeElement.disabled = true;
			this.recordState = 'RECORDING';
		});

		mediaRecorder.addEventListener('dataavailable', () => {
			this.record_button.nativeElement.style.backgroundImage =
				"url('/assets/stopped_state.png')";
			this.micro_button.nativeElement.disabled = false;
			this.recordState = 'RECORD';
		});
	}

	private countDownEvents(second: number) {
		this.recordState = second.toString();
	}

	toggleMicrophone() {
		this.microState = !this.microState;
		if (this.microState) {
			this.micro_button.nativeElement.style.backgroundImage =
				"url('/assets/micro_enable.png')";
		} else {
			this.micro_button.nativeElement.style.backgroundImage =
				"url('/assets/micro_disable.png')";
		}
	}
}