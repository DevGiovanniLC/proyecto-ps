import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScreenshotButtonComponent } from '../screenshot-button/screenshot-button.component';
import { OptionsComponent } from '../options/options.component';
import { PrevisualitionContentDialogComponent } from '../previsualition-content-dialog/previsualition-content-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { VideoRecorder } from '../../../services/VideoRecorder.service';

@Component({
    selector: 'app-record-button',
    standalone: true,
    providers: [VideoRecorder],
    imports: [FormsModule, ScreenshotButtonComponent, OptionsComponent],
    templateUrl: './record-button.component.html',
    styleUrl: './record-button.component.css',
})
export class RecordButtonComponent {
    @ViewChild('record_button') $recordButton: ElementRef;
    @ViewChild('micro_button') $microButton: ElementRef;

    private microphoneEnabled: boolean;

    protected state: string;

    @Input() _framerate: number;
    @Input() _resolution: number;
    @Input() _delay: number;
    @Input() _format: string;

    constructor(private _matDialog: MatDialog, private videoRecorder: VideoRecorder) {
        this.state = 'RECORD';
        this.microphoneEnabled = true;
    }

    ngOnInit(): void {
        this.videoRecorder.getMediaRecorder().subscribe((mediarecorder) => {
            if (mediarecorder != null) this.handleMediaRecorderEvents(mediarecorder);
        })
    }

    private openModal(data: Blob, format: string) {
        this._matDialog.open(PrevisualitionContentDialogComponent, {
            width: '65%',
            data: {
                blobData: data,
                format: format
            }
        })
    }

    async toggleRecording(): Promise<void> {
        if (this.videoRecorder.isRecording()) {
            await this.videoRecorder.stop();
        } else {
            this.videoRecorder.toggleMicrophone(this.microphoneEnabled);
            await this.videoRecorder.start(this._framerate, this._resolution, this._delay);
        }
    }

    private handleMediaRecorderEvents(recorder: MediaRecorder): void {
        recorder.addEventListener('start', () =>
            this.updateStateAndButtonStyle('RECORDING')
        );
        recorder.addEventListener('dataavailable', (event: BlobEvent) => {
            this.updateStateAndButtonStyle('RECORD')
            this.openModal(event.data, this._format);
        });
    }

    private updateStateAndButtonStyle(state: string): void {
        this.state = state;
        this.$recordButton.nativeElement.style.backgroundImage =
            state === 'RECORDING'
                ? "url('/assets/recording_state.webp')"
                : "url('/assets/stopped_state.webp')";
        this.$microButton.nativeElement.disabled = state !== 'RECORD';
    }

    protected toggleMicrophone() {
        this.microphoneEnabled = !this.microphoneEnabled;
        if (this.microphoneEnabled) {
            this.$microButton.nativeElement.style.backgroundImage =
                "url('/assets/micro_enable.webp')";
        } else {
            this.$microButton.nativeElement.style.backgroundImage =
                "url('/assets/micro_disable.webp')";
        }
    }
}
