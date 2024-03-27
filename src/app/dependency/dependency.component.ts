import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CdkDrag} from '@angular/cdk/drag-drop';

@Component({
  selector: 'dependency',
  standalone: true,
  imports: [CommonModule, CdkDrag],
  templateUrl: './dependency.component.html',
  styleUrls: ['./dependency.component.scss']
})
export class DependencyComponent {

}
