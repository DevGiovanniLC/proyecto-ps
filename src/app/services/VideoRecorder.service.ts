import { NextObserver, Subscribable, Unsubscribable } from 'rxjs';
import { MediaCombiner } from './MediaCombiner.service';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})

export class VideoRecorder implements Subscribable<any>, Unsubscribable {
	private media: MediaStream;
	private mediaRecorder: MediaRecorder;

	private observers: NextObserver<any>[];
	private micro: boolean;

	private audioStream: MediaStream;
	private videoStream: MediaStream;

	constructor(private mediaCombiner: MediaCombiner) {
		this.observers = [];
		this.micro = true;
	}

	public async start(
		framerate: number,
		resolution: number,
		delay: number
	): Promise<void> {
		this.videoStream = await this.getDisplayMedia(framerate, resolution);
		this.audioStream = this.micro
		? await navigator.mediaDevices.getUserMedia({ audio: true })
		: null;
		this.media = this.audioStream
			? this.mediaCombiner.combine([this.audioStream, this.videoStream])
			: this.videoStream;

		this.mediaRecorder = this.generateMediaRecorder(this.media);

		setTimeout(() => {
			this.notifyObserver(this.mediaRecorder);
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

	private generateMediaRecorder(stream: MediaStream): MediaRecorder {
		const recorder = new MediaRecorder(stream, {
			mimeType: 'video/x-matroska',
		});

		return recorder;
	}

	private generateVideoTrack(media: MediaStream): MediaStreamTrack {
		const videoTrack = media.getVideoTracks()[0];
		videoTrack.onended = () => this.stop();
		return videoTrack;
	}

	async stop(): Promise<void> {
		this.mediaRecorder?.stop();
		this.mediaRecorder = null;
		this.media.getTracks().forEach((track) => track.stop());
		this.audioStream?.getTracks().forEach((track) => track.stop());
		this.videoStream?.getTracks().forEach((track) => track.stop());
	}

	isRecording(): boolean {
		if (this.mediaRecorder == null) return false;
		return true;
	}

	toggleMicrophone(enabled: boolean): void {
		this.micro = enabled;
	}

	subscribe(observer: NextObserver<any>): Unsubscribable {
		this.observers.push(observer);
		return this;
	}

	private notifyObserver(data: any): void {
		this.observers.forEach((observer) => observer.next(data));
	}

	unsubscribe(): void {
		this.observers = [];
	}
}
