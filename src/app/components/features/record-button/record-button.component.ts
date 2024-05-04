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
    @Input() _framerate: number;
    @Input() _resolution: number;
    @Input() _delay: number;
    @Input() _format: string;

    protected $recordingState: string;

    protected $iconRecord: string;
    protected $recordingIconDisabled: boolean;
    protected $iconMicro: string;
    protected $microphoneIconDisabled: boolean;

    constructor(private _matDialog: MatDialog, private videoRecorder: VideoRecorder) {
        this.$recordingState = 'RECORD';
        this.$microphoneIconDisabled = true;
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
            this.videoRecorder.toggleMicrophone(this.$microphoneIconDisabled);
            await this.videoRecorder.start(this._framerate, this._resolution, this._delay,()=>{
                this.$recordingIconDisabled = true
            });
        }
    }

    private handleMediaRecorderEvents(recorder: MediaRecorder): void {
        recorder.addEventListener('start', () => {
            this.updateStateAndButtonStyle('RECORDING');
            this.$recordingIconDisabled = false
        }
        );
        recorder.addEventListener('dataavailable', (event: BlobEvent) => {
            this.updateStateAndButtonStyle('RECORD')
            this.openModal(event.data, this._format);
        });
    }

    private updateStateAndButtonStyle(state: string): void {

        this.$recordingState = state;

        if (state === 'RECORDING') {
            this.$iconRecord = "url('/assets/recording_state.webp')"
            this.$microphoneIconDisabled = true;
        } else {
            this.$iconRecord = "url('/assets/stopped_state.webp')"
            this.$microphoneIconDisabled = false
        }
    }

    protected toggleMicrophone() {
        this.$microphoneIconDisabled = !this.$microphoneIconDisabled;
        this.$iconMicro = this.$microphoneIconDisabled ? 'url(/assets/micro_enable.webp)' : 'url(/assets/micro_disable.webp'
    }
}
