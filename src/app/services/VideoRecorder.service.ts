import { BehaviorSubject } from 'rxjs';
import { MediaCombiner } from './MediaCombiner.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class VideoRecorder {

    private media: MediaStream;
    private mediaRecorder: MediaRecorder;
    private recordingObservable: BehaviorSubject<MediaRecorder>;

    private microphone: boolean;

    private audioStream: MediaStream;
    private videoStream: MediaStream;


    constructor(private mediaCombiner: MediaCombiner) {
        this.recordingObservable = new BehaviorSubject<MediaRecorder>(this.mediaRecorder)
        this.microphone = true;
    }

    public async start(
        framerate: number,
        resolution: number,
        delay: number
    ): Promise<void> {
        this.videoStream = await this.getDisplayMedia(framerate, resolution);
        this.audioStream = this.microphone
            ? await navigator.mediaDevices.getUserMedia({ audio: true })
            : null;
        this.media = this.audioStream
            ? this.mediaCombiner.combine([this.audioStream, this.videoStream])
            : this.videoStream;

        this.mediaRecorder = new MediaRecorder(this.media);
        this.recordingObservable.next(this.mediaRecorder);

        setTimeout(() => {
            this.mediaRecorder.start();
            this.generateVideoTrack(this.media);
        }, delay);
    }

    private async getDisplayMedia(
        frameRate: number,
        height: number
    ): Promise<MediaStream> {
        return navigator.mediaDevices.getDisplayMedia({
            video: { frameRate: { ideal: frameRate, max: 60 }, height },
            audio: true,
        });
    }

    private generateVideoTrack(media: MediaStream): void {
        media.getVideoTracks().forEach((track) => track.onended = () => this.stop());
    }

    async stop(): Promise<void> {
        this.mediaRecorder.stop();
        this.mediaRecorder = null;
        this.recordingObservable.next(this.mediaRecorder);
        this.media.getTracks().forEach((track) => track.stop());
        this.audioStream?.getTracks().forEach((track) => track.stop());
        this.videoStream?.getTracks().forEach((track) => track.stop());
    }

    isRecording(): boolean {
        if (this.mediaRecorder == null) return false;
        return true;
    }

    toggleMicrophone(state: boolean): void {
        this.microphone = state;
    }

    getMediaRecorder(): BehaviorSubject<MediaRecorder> {
        return this.recordingObservable
    }

}
