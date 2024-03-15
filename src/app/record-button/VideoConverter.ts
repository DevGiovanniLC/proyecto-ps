import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';


export  class VideoConverter{

    ffmpegRef : FFmpeg

    public constructor(){
        this.ffmpegRef = new FFmpeg();
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
        this.load(this.ffmpegRef, baseURL)
    }

    private async load(ffmpegRef: FFmpeg, baseURL: string){
        ffmpegRef.on('log', ({ message }) => {
            console.log(message);
        });
        await ffmpegRef.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });
    }

    public async transcode(url:string): Promise<string>{
        await this.ffmpegRef.writeFile('input.webm', await fetchFile(url));
        await this.ffmpegRef.exec(['-i', 'input.webm', 'output.mp4']);
        const data = await this.ffmpegRef.readFile('output.mp4');
        return URL.createObjectURL(new Blob([data], { type: 'video/mp4' }));
    }
}