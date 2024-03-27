import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  projectConfig: object = {
    projectPath: "C:\\Users\\jonathan.mcdonnell\\WebstormProjects\\aspera-pi-portal",
    packageName: "",
    linksTo: [
        {
            projectPath: "C:\\Users\\jonathan.mcdonnell\\IdeaProjects\\kinsale-forms",
            packageName: "@kinsale/forms",
        }
    ]
}

  startLinker() {
    window.linkerApi.startLinker(this.projectConfig);
  }

  stopLinker() {
    window.linkerApi.stopLinker();
  }

}
