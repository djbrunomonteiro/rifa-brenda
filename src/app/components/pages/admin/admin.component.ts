import { Component, OnInit } from '@angular/core';
import { MaterialSharedModule } from '../../../modules/material-shared/material-shared.module';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';
import { CoreService } from '../../../services/core.service';
import { INums } from '../../../models/nums';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MatDialog } from '@angular/material/dialog';
import { EdialogRemoveComponent } from '../../shared/edialog-remove/edialog-remove.component';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    MaterialSharedModule,
    CommonModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {

  chavePix = environment.chavePix;

  itens: INums[] = [];

  domin = environment.firebaseConfig.authDomain;
  link = '';


  constructor(
    public auth: AuthService,
    public core: CoreService,
    private dialog: MatDialog
  ) {

  }
  ngOnInit(): void {
    this.getCompradores();
    this.auth.userData$.subscribe(user => {
      this.link = `https://${this.domin}/vendedor/${user.email}`

    })
  }

  getCompradores() {
    this.core.getAll().subscribe(res => {
      const { results } = res;
      if (!results) { return }
      console.log('ops', res);
      console.log(this.auth.userData$.value?.email);
      this.auth.userData$.subscribe(user => {
        console.log(user);

        this.itens = results.filter((elem: INums) => elem?.vendedor === user?.email);

      })


      console.log(this.itens);;





    })
  }

  checkIsPago(item: boolean) {

    return item

  }

  updateStatus(num: INums, event: any) {
    const { checked } = event;
    const item: INums = { ...num, pago: checked }
    this.core.updateOne(item).subscribe(res => {
      console.log(res);

    })

  }


  openDelete(data: any) {
    const dialogRef = this.dialog.open(EdialogRemoveComponent, { data });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) { return }
      this.getCompradores();
    });
  }


}
