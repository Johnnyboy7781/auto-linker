import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, ViewContainerRef } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { DependencyComponent } from '../dependency/dependency.component';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-dependency-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './dependency-dialog.component.html',
  styleUrl: './dependency-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DependencyDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DependencyDialogComponent>,
    private viewContainerRef: ViewContainerRef,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  close(result: boolean) {
    this.dialogRef.close(result);
  }
}

interface DialogData {
  packageName: string,
  absolutePath: string
}
