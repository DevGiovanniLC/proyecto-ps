export class MediaCombiner {
	streamsList: MediaStream[];

	constructor(streamsList: MediaStream[]) {
		this.streamsList = streamsList;
	}

	combine() {
		const audioStream = this.combineAudio();
		const videoStream = this.combineVideo();
		return this.combineVideoAudio(audioStream, videoStream);
	}

	private combineAudio(): MediaStream {
		const audioContext = new AudioContext();
		const audioMedia = audioContext.createMediaStreamDestination();

		this.streamsList.forEach((stream) => {
			const streamNode = audioContext.createMediaStreamSource(stream);
			streamNode.connect(audioMedia);
		});

		return audioMedia.stream;
	}

	private combineVideo() {
		const videoMedia = new MediaStream();
		this.streamsList.forEach((stream) =>
			stream
				.getVideoTracks()
				.forEach((track) => videoMedia.addTrack(track))
		);
		return videoMedia;
	}

	private combineVideoAudio(
		audioStream: MediaStream,
		videoStream: MediaStream
	) {
		const media = new MediaStream();
		videoStream.getVideoTracks().forEach((track) => media.addTrack(track));
		audioStream.getAudioTracks().forEach((track) => media.addTrack(track));
		return media;
	}
}
