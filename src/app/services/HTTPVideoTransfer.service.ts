import { Injectable } from "@angular/core";

@Injectable({
	providedIn: 'root'
})

export class HTTPVideoTransfer {
    constructor() { }

    sendVideo(file: Blob, format: string, func?: Function) {

        const formData = new FormData();
        formData.append('video', file);
        formData.append('format', format);

        fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
        })
            .then(async (res) => {
                res.arrayBuffer().then((data) => {
                    if (func) func();
                    this.downloadVideo(new Blob([data]), format)
                })
            })
            .catch(error => {
                this.downloadVideo(file, "mkv")
            });

    }

    private async downloadVideo(data: Blob, format: string): Promise<void> {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(data);
        link.download = 'video.' + format;
        link.click();
    }

}