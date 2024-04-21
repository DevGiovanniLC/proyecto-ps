import { Injectable } from "@angular/core";

@Injectable({
	providedIn: 'root'
})

export class MediaCombiner {

	constructor() { }

	combine(streamsList: MediaStream[]): MediaStream {
		const audioStream = this.combineAudio(streamsList);
		const videoStream = this.combineVideo(streamsList);
		return this.combineVideoAudio(audioStream, videoStream);
	}

	private combineAudio(streamsList: MediaStream[]): MediaStream {
		const audioContext = new AudioContext();
		const audioStream = audioContext.createMediaStreamDestination();

		for (const stream of streamsList) {
			if (stream.getAudioTracks().length === 0) continue;
			const streamNode = audioContext.createMediaStreamSource(stream);
			streamNode.connect(audioStream);
		}

		return audioStream.stream;
	}

	private combineVideo(streamsList: MediaStream[]): MediaStream {
		const videoMedia = new MediaStream();
		streamsList.forEach(stream =>
			stream
				.getVideoTracks()
				.forEach((track) => videoMedia.addTrack(track))
		);
		return videoMedia;
	}

	private combineVideoAudio(audioStream: MediaStream, videoStream: MediaStream): MediaStream {
		const combinedMedia = new MediaStream();
		[...videoStream.getVideoTracks(), ...audioStream.getAudioTracks()]
			.forEach(track => combinedMedia.addTrack(track));
		return combinedMedia;
	}
}
