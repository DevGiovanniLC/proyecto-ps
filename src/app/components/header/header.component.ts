import { Component, EventEmitter, inject, Output } from "@angular/core";
import { Router, RouterLink, NavigationEnd } from "@angular/router";
import { LogInComponent } from "../auth/log-in/log-in.component";
import { AuthService } from "../../services/AuthService.service";
import { MatDialog } from "@angular/material/dialog";
import {
    PrevisualitionOptionDialogComponent
} from "../features/previsualition-option-dialog/previsualition-option-dialog.component";




@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, LogInComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export default class HeaderComponent {
    isloogedIn: boolean
    firebaseService = inject(AuthService);
    currentPage: string;
    @Output() optionsChanged: EventEmitter<any> = new EventEmitter<any>();

    constructor(private router: Router, private dialog: MatDialog) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.currentPage = event.url;
            }
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

    openModal(): void {
        const dialogRef = this.dialog.open(PrevisualitionOptionDialogComponent, {
            width: '65%',
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.optionsChanged.emit(result)
                console.log('Opciones recibidas en el Header:', result);
            } else {
                console.log('El modal fue cerrado sin guardar cambios');
            }
        });
    }









}
