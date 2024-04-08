import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VideoRecorder } from './VideoRecorder';
import { ScreenshotButtonComponent } from '../screenshot-button/screenshot-button.component';
import { OptionsComponent } from '../../options/options.component';
import { DataService } from '../../data.service';

@Component({
	selector: 'app-record-button',
	standalone: true,
	imports: [FormsModule, ScreenshotButtonComponent, OptionsComponent],
	templateUrl: './record-button.component.html',
	styleUrl: './record-button.component.css',
})
export class RecordButtonComponent {
	videoRecorder: VideoRecorder;
	@ViewChild('record_button') record_button!: ElementRef;

	constructor(private dataService: DataService) {
		this.videoRecorder = new VideoRecorder();
	}

	recordEvent(): void {
		if (this.videoRecorder.isRecording()) {
			this.videoRecorder.stop();
		} else {
			this.videoRecorder.start(
				this.dataService.framerateValue,
				this.dataService.resolutionValue,
				this.dataService.delayValue,
				this.record_button.nativeElement
			);
		}
	}
}
