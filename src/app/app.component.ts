import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DependencyComponent } from './dependency/dependency.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [CommonModule, DependencyComponent]
})
export class AppComponent {

  constructor(private viewContainerRef: ViewContainerRef) {}

  projectConfig: object = {
    projectPath: 'C:\\Users\\jonathan.mcdonnell\\WebstormProjects\\aspera-pi-portal',
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

  generateComp() {
    const component = this.viewContainerRef.createComponent(DependencyComponent);
  }
}
