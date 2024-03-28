import { Component } from '@angular/core';
import { MaterialSharedModule } from '../../../modules/material-shared/material-shared.module';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';
import { CoreService } from '../../../services/core.service';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    MaterialSharedModule,
    CommonModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent  {

  chavePix = environment.chavePix;

  constructor(
    public auth: AuthService,
    public core: CoreService
  ){
    
  }

}
