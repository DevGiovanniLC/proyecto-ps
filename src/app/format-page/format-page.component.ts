import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-format-page',
  templateUrl: './format-page.component.html',
  standalone: true,
  styleUrls: ['./format-page.component.css'],
  imports: [HeaderComponent],
})
export class FormatPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
