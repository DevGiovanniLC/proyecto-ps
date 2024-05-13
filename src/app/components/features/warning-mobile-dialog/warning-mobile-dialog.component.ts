import { Component } from '@angular/core';
import { MatDialogClose, MatDialogContent } from "@angular/material/dialog";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-warning-mobile-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogClose,
    RouterLink
  ],
  templateUrl: './warning-mobile-dialog.component.html',
  styleUrl: './warning-mobile-dialog.component.css'
})
export class WarningMobileDialogComponent {

}
