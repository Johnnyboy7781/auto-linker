import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectronService } from 'ngx-electronyzer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private electronService: ElectronService) {}

  test() {
    console.log("from app comp ts!");
    window.linkerApi.test('my message')
  }

}
