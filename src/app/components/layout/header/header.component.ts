import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MaterialSharedModule } from '../../../modules/material-shared/material-shared.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MaterialSharedModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
