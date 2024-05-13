import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslationService } from '../../translation';

@Component({
	selector: 'app-whoweare',
	standalone: true,
	imports: [],
	templateUrl: './whoweare.component.html',
	styleUrl: './whoweare.component.css',
})
export class WhoweareComponent implements OnInit{

	jsonData: any;
	selectedLanguage: string;
	menuItems: string[] = ['', '', '', '', '', ''];

	constructor(private translation: TranslationService, private http: HttpClient) {
		this.selectedLanguage = localStorage.getItem('selectedLanguage');
	}

	async ngOnInit() {
        this.jsonData = await this.http.get<any>("../../../assets/i18n/who_are_we_content.json").toPromise();
        
        this.translateAll();    
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

}
