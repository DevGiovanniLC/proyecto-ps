import { BehaviorSubject } from 'rxjs';
import { MediaCombiner } from './MediaCombiner.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class VideoRecorder {

    private videoStream: MediaStream;
    private audioStream: MediaStream;
    private mediaRecorder: MediaRecorder;
    private recordingObservable: BehaviorSubject<MediaRecorder>;

    private microphoneActive: boolean;

    constructor(private mediaCombiner: MediaCombiner) {
        this.recordingObservable = new BehaviorSubject<MediaRecorder>(this.mediaRecorder)
        this.microphoneActive = true;
    }

    public async start(
        frameRate: number,
        height: number,
        delay: number,
        func?: Function
    ): Promise<void> {

        this.videoStream = await navigator.mediaDevices.getDisplayMedia({
            video: { frameRate, height },
            audio: true,
        });

        this.audioStream = this.microphoneActive ? await navigator.mediaDevices.getUserMedia({ audio: true }) : null;
        const media = this.audioStream ? this.mediaCombiner.combine([this.audioStream, this.videoStream]) : this.videoStream;

        this.mediaRecorder = new MediaRecorder(media);
        this.recordingObservable.next(this.mediaRecorder);

        if (func) func();
        setTimeout(() => {
            this.mediaRecorder.start();
            media.getVideoTracks().forEach((track) => track.onended = () => this.stop());
        }, delay);
    }

    async stop(): Promise<void> {
        this.videoStream.getTracks().forEach((track) => track.stop());
        this.audioStream.getTracks().forEach((track) => track.stop());
        this.mediaRecorder.stop();
        this.mediaRecorder = null;
    }

    isRecording(): boolean {
        if (this.mediaRecorder == null) return false;
        return true;
    }

    toggleMicrophone(state: boolean): void {
        this.microphoneActive = state;
    }

    getMediaRecorder(): BehaviorSubject<MediaRecorder> {
        return this.recordingObservable
    }

}
