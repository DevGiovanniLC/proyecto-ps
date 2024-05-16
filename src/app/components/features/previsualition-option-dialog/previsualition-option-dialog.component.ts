import { Component, ViewChild } from "@angular/core";
import { OptionsComponent } from "../options/options.component";
import { MatDialogRef } from "@angular/material/dialog";

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
    @ViewChild('options') optionsComponent: OptionsComponent;

    constructor(public dialogRef: MatDialogRef<PrevisualitionOptionDialogComponent>) {
    }

    closeModal() {
        this.dialogRef.close()
    }



    saveModal(): void {
        const selectedOptions = this.optionsComponent.getOptions(); // Suponiendo que tienes un método getOptions() en tu componente options
        console.log('Opciones elegidas:', selectedOptions);
        this.dialogRef.close(selectedOptions); // Devuelve las opciones al cerrar el modal
    }
}
