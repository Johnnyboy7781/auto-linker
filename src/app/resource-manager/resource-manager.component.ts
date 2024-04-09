import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'resource-manager',
  standalone: true,
  imports: [MatExpansionModule, MatIconModule],
  templateUrl: './resource-manager.component.html',
  styleUrl: './resource-manager.component.scss'
})
export class ResourceManagerComponent {

}
