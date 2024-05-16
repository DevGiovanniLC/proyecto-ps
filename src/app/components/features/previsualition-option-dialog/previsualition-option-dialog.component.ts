import { Component, ViewChild, OnInit} from "@angular/core";
import { OptionsComponent } from "../options/options.component";
import { MatDialogRef } from "@angular/material/dialog";
import { TranslationService } from "../../../../translation";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'app-previsualition-option-dialog',
    standalone: true,
    imports: [
        OptionsComponent
    ],
    templateUrl: './previsualition-option-dialog.component.html',
    styleUrl: './previsualition-option-dialog.component.css'
})
export class PrevisualitionOptionDialogComponent {

    menuItems: string[] = ['', '', '', ''];
    selectedLanguage: string;
    jsonData: any;
    @ViewChild('options') optionsComponent: OptionsComponent;

    constructor(public dialogRef: MatDialogRef<PrevisualitionOptionDialogComponent>, private translation: TranslationService, private http: HttpClient) {
        this.selectedLanguage = localStorage.getItem('selectedLanguage');
    }

    async ngOnInit(){
        this.jsonData = await this.http.get<any>("../../../assets/i18n/config.json").toPromise();
            
        this.translateAll();   
        
      }

    closeModal() {
        this.dialogRef.close()
    }

    translateAll() {
        
        localStorage.setItem('selectedLanguage', this.selectedLanguage);
        let values: string[] = Object.values(this.jsonData);
        
        
    
        values.forEach((text, index) => {
          this.translate(text, index);
          
        });
      }
    
    translate(text: string, index: number) {
        this.translation.translateText(text, this.selectedLanguage)
          .subscribe((response: any) => {
            this.menuItems[index] = response.data.translations[0].translatedText;
          }, (error) => {
            console.error('Error al traducir:', error);
          });
      }

    saveModal(): void {
        const selectedOptions = this.optionsComponent.getOptions(); // Suponiendo que tienes un método getOptions() en tu componente options
        console.log('Opciones elegidas:', selectedOptions);
        this.dialogRef.close(selectedOptions); // Devuelve las opciones al cerrar el modal
    }
}
