import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TranslationService {
  private readonly API_URL = 'https://translation.googleapis.com/language/translate/v2';
  private readonly API_KEY = 'AIzaSyAQ8Jf4-NuJAO_v71EK1RR0QZaT1j-AVLw'; // Reemplaza esto con tu propia clave API

  constructor(private http: HttpClient) { }

  translateText(text: string, targetLanguage: string): Observable<any> {
    const url = `${this.API_URL}?key=${this.API_KEY}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {
      q: text,
      target: targetLanguage
    };
    return this.http.post(url, body, { headers });
  }
}