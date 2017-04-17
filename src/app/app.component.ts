import { Component } from '@angular/core';
import { AppGlobal } from './app-global';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 appGlobal = AppGlobal.getInstance();
  title = 'app works!';
}


