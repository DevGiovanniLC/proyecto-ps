import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VideoRecorder } from './VideoRecorder';
import { ScreenshotButtonComponent } from '../screenshot-button/screenshot-button.component';
import { DataService } from '../../data.service';
import { OptionsComponent } from '../options/options.component';
import { NextObserver } from 'rxjs';

@Component({
	selector: 'app-record-button',
	standalone: true,
	imports: [FormsModule, ScreenshotButtonComponent, OptionsComponent],
	templateUrl: './record-button.component.html',
	styleUrl: './record-button.component.css',
})
export class RecordButtonComponent implements NextObserver<any> {
	videoRecorder: VideoRecorder;
	@ViewChild('record_button') record_button!: ElementRef;

	constructor(private dataService: DataService) {
		this.videoRecorder = new VideoRecorder(
			this.dataService.framerateValue,
			this.dataService.resolutionValue,
			this.dataService.delayValue
		);

		this.videoRecorder.subscribe(this);
	}

	async recordEvent(): Promise<void> {
		if (this.videoRecorder.state() == 'recording') {
			this.videoRecorder.stop();
		} else {
			await this.videoRecorder.start();
		}
	}

	next(mediaRecorder: MediaRecorder): void {
		if (mediaRecorder == null) return;

		mediaRecorder.addEventListener('start', () => {
			this.record_button.nativeElement.style.backgroundImage =
				"url('../../../assets/recording_state.png')";
		});

		mediaRecorder.addEventListener('dataavailable', () => {
			this.record_button.nativeElement.style.backgroundImage =
				"url('../../../assets/stopped_state.png')";
		});
	}
}
