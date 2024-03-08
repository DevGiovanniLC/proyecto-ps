import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-record-button',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './record-button.component.html',
    styleUrl: './record-button.component.css'
})

export class RecordButtonComponent {
    mediaRecorder: any = null;
    framerate_value: number = 60
    resolution_value: number = 1080
    
    ngAfterViewInit(): void {
        const  record_button = document.getElementById('record-button'); 

        if (record_button) {
            record_button.addEventListener('click', (event) =>{ 

            if (this.mediaRecorder == null) {
                this.setRecord(event)
                return
            }

            if (this.mediaRecorder.state == 'recording') {
                this.mediaRecorder.stop();
                this.mediaRecorder = null;
            }
            
            });
        }

        this.getCodecs()

    }

    async setRecord( event : MouseEvent ): Promise<void> {
        
        let media = await this.getMedia(this.framerate_value, this.resolution_value)

        this.mediaRecorder = this.getMediaRecorder(media)
        
        if (this.mediaRecorder ) {
            (this.mediaRecorder as MediaRecorder).onstop = (event) =>{
                this.mediaRecorder = null;
            }
        }

        this.mediaRecorder.start()
        
        const video = this.getVideoTrack(media)

        video.addEventListener("ended", async () => {
            this.mediaRecorder.stop()     
        })
        
        this.mediaRecorder.addEventListener("dataavailable", (event: BlobEvent) => { 
            this.downloadVideo(event) 
        })

    }

    private async  getMedia(framerate : number, resolution: number): Promise<MediaStream> {
        return  navigator.mediaDevices.getDisplayMedia({
            video: { 
                frameRate: { ideal: framerate, max:60}, // standar framerate 15, 24, 30, 60
                height: resolution
            }, 
            audio: true
        })
    }
    
    private getMediaRecorder(media: MediaStream): MediaRecorder {        
        return new  MediaRecorder(media, {
            mimeType: 'video/x-matroska'
        })
    }

    private getCodecs(): void{
        const video = RTCRtpReceiver.getCapabilities('video')?.codecs
        const audio = RTCRtpReceiver.getCapabilities('audio')?.codecs
        video?.forEach((codec)=>{
            console.log(codec.mimeType)
        }
        
        )
    }
    
    private  getVideoTrack(media: MediaStream): MediaStreamTrack{
        return  media.getVideoTracks()[0]
    }
    
    private downloadVideo(event: BlobEvent): void{
        const link = document.createElement("a")
        link.href = URL.createObjectURL(event.data)
        link.download = "captura.mkv"
        link.click()
    }
    
    public async getScreen(){
        return this 
    }

    
}
