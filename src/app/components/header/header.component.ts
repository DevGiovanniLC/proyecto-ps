import { Component, inject, OnInit } from "@angular/core";
import { Router, RouterLink, NavigationEnd } from "@angular/router";
import { LogInComponent } from "../auth/log-in/log-in.component";
import { AuthService } from "../../services/AuthService.service";
import { TranslationService } from "../../../translation";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, LogInComponent, FormsModule, CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export default class HeaderComponent implements OnInit{
    isloogedIn: boolean
    firebaseService = inject(AuthService);
    targetLanguages = ['es', 'ar', 'fr', 'it', 'en', 'pt', 'zh-CN', 'ja', 'ru', 'hi'];
    menuItems: string[] = ['WHO WE ARE', 'LOG IN', 'SIGN UP', 'LOG OUT', 'FORMAT CONVERTER', "HOME"];
    selectedLanguage: string;
    jsonData: any;
    currentPage: string;
    constructor(private translation: TranslationService, private http: HttpClient, private router: Router) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.currentPage = event.url;
            }
        });
        this.selectedLanguage = localStorage.getItem('selectedLanguage');
        
    }

    async ngOnInit() {
        this.jsonData = await this.http.get<any>("../../../assets/i18n/header_content.json").toPromise();
        
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

    storage() {
        return localStorage.getItem('isloogedIn') === 'true'
    }

    getlog(): boolean {
        localStorage.setItem('isloogedIn', "false")
        return this.firebaseService.getLogin()
    }

    getout() {
        return this.firebaseService.signout()
    }






}
