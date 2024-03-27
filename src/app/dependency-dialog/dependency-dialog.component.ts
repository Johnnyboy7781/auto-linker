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
    @Inject(MAT_DIALOG_DATA) public data: DependencyData,
  ) {}

  close() {
    this.dialogRef.close(this.data);
  }
}

export interface DependencyData {
  packageName: string,
  absolutePath: string
}

export const dependencyDataGuard = (obj: unknown): obj is DependencyData => {
  if (typeof obj === 'object' && obj) {
    if (!('packageName' in obj) || !('absolutePath' in obj)) {
      return false;
    }

    const dependencyData = obj as DependencyData;
    if (dependencyData.packageName && dependencyData.absolutePath) {
      return true;
    }
  }
  return false;
};
