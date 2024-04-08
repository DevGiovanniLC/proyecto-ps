import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VideoRecorder } from './VideoRecorder';
import { ScreenshotButtonComponent } from '../screenshot-button/screenshot-button.component';
import { Observer } from './Observer';
import { DataService } from '../../data.service';
import { OptionsComponent } from '../../options/options.component';
@Component({
	selector: 'app-record-button',
	standalone: true,
	imports: [FormsModule, ScreenshotButtonComponent, OptionsComponent],
	templateUrl: './record-button.component.html',
	styleUrl: './record-button.component.css',
})
export class RecordButtonComponent implements Observer {
	videoRecorder: VideoRecorder;
	@ViewChild('record_button') record_button!: ElementRef;

	constructor(private dataService: DataService) {

		this.videoRecorder = new VideoRecorder(
			this.dataService.framerateValue,
			this.dataService.resolutionValue,
			this.dataService.delayValue,
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
