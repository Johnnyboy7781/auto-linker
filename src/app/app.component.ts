import {
  ChangeDetectionStrategy,
  Component,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DependencyComponent } from './components/dependency/dependency.component';
import {
  DependencyData,
  DependencyDialogComponent,
  dependencyDataGuard,
} from './components/dependency-dialog/dependency-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ApplicationManagerComponent } from "./application-manager/application-manager.component";
import { ResourceManagerComponent } from "./resource-manager/resource-manager.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, DependencyComponent, MatSidenavModule, ApplicationManagerComponent, ResourceManagerComponent]
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
