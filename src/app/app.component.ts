import {
  ChangeDetectionStrategy,
  Component,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DependencyComponent } from './dependency/dependency.component';
import {
  DependencyData,
  DependencyDialogComponent,
  dependencyDataGuard,
} from './dependency-dialog/dependency-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, DependencyComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(
    private viewContainerRef: ViewContainerRef,
    private dialog: MatDialog
  ) {}

  projectConfig: object = {
    projectPath:
      'C:\\Users\\jonathan.mcdonnell\\WebstormProjects\\aspera-pi-portal',
    packageName: '',
    linksTo: [
      {
        projectPath:
          'C:\\Users\\jonathan.mcdonnell\\IdeaProjects\\kinsale-forms',
        packageName: '@kinsale/forms',
      },
    ],
  };

  startLinker() {
    window.linkerApi.startLinker(this.projectConfig);
  }

  stopLinker() {
    window.linkerApi.stopLinker();
  }

  generateComp(dependencyData: DependencyData) {
    const component =
      this.viewContainerRef.createComponent(DependencyComponent);
    component.instance.packageName = dependencyData.packageName;
    component.instance.absolutePath = dependencyData.absolutePath;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DependencyDialogComponent, {
      data: {},
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (dependencyDataGuard(result)) {
        this.generateComp(result);
      }
    });
  }
}
