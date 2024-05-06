import { Component, OnInit } from "@angular/core";
import {RouterOutlet} from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import {
  WarningMobileDialogComponent
} from "./components/features/warning-mobile-dialog/warning-mobile-dialog.component";
import { NavigatorInfoService } from "./services/navigator-info.service";

@Component({
    selector: 'app-root',
    standalone: true,
    providers: [NavigatorInfoService],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [RouterOutlet]
})
export class AppComponent implements OnInit{
    constructor(private _matDialog: MatDialog,private navigatorInfoService: NavigatorInfoService) { }

  ngOnInit(): void {
     if(this.navigatorInfoService.DetectUserTypeDevice()){
       console.log(this.navigatorInfoService.DetectUserTypeDevice())
       this.openModal()
     }
    }
    private openModal() {
      this._matDialog.open(WarningMobileDialogComponent, {
        width: '65%',
      })
    }
}
