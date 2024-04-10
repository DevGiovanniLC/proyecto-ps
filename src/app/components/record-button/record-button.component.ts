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
	@ViewChild('record_button') record_button!: ElementRef;
	@ViewChild('micro_button') micro_button!: ElementRef;
	videoRecorder: VideoRecorder;
	microState: boolean;

	constructor(private dataService: DataService) {
		this.videoRecorder = new VideoRecorder(
			this.dataService.framerateValue,
			this.dataService.resolutionValue,
			this.dataService.delayValue
		);

		this.microState = true;
		this.videoRecorder.subscribe(this);
	}

	async recordEvent(): Promise<void> {
		if (this.videoRecorder.state() == 'recording') {
			this.videoRecorder.stop();
		} else {
			this.videoRecorder.microphone(this.microState);
			await this.videoRecorder.start();
		}
	}
	
	next(mediaRecorder: MediaRecorder): void {
		if (mediaRecorder == null) return;
		
		mediaRecorder.addEventListener('start', () => {
			this.record_button.nativeElement.style.backgroundImage =
			"url('../../../assets/recording_state.png')";
			this.micro_button.nativeElement.disabled = true
		});
		
		mediaRecorder.addEventListener('dataavailable', () => {
			this.record_button.nativeElement.style.backgroundImage =
			"url('../../../assets/stopped_state.png')";
			this.micro_button.nativeElement.disabled = false
		});
	}

	toggleMicrophone() {
		this.microState = !this.microState;
		if (this.microState) {
			this.micro_button.nativeElement.style.backgroundImage =
				"url('../../../assets/micro_enable.png')";
		}else{
			this.micro_button.nativeElement.style.backgroundImage =
			"url('../../../assets/micro_disable.png')";
		}
	}
}
