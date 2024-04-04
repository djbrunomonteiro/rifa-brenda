import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/layout/header/header.component';
import { TabsComponent } from './components/layout/tabs/tabs.component';
import { AuthService } from './services/auth.service';
import { ShareButtonsConfig, ShareModule } from 'ngx-sharebuttons';

const customConfig: ShareButtonsConfig = {
  include: ['facebook', 'twitter', 'google'],
  exclude: ['tumblr', 'stumble', 'vk'],
  theme: 'modern-light',
  gaTracking: true,
  twitterAccount: 'twitterUsername'
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    TabsComponent,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'Rifa da Brenda';

  constructor(private auth: AuthService){}

  ngOnInit(): void {
    this.auth.isAuth()
  }
}
