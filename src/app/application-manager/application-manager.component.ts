import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'application-manager',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatButtonModule, MatIconModule],
  templateUrl: './application-manager.component.html',
  styleUrl: './application-manager.component.scss'
})
export class ApplicationManagerComponent {
  
}
