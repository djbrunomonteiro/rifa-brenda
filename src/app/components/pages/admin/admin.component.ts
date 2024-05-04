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
import { FormControl } from '@angular/forms';
import { DialogSorteioComponent } from '../../shared/dialog-sorteio/dialog-sorteio.component';


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

  selected = new FormControl(0);

  itens: INums[] = [];
  compradoresParaSorteio: INums[] = [];

  ganhardor!: INums

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
      if (!user) { return }
      this.link = `https://${this.domin}/vendedor/${user.email}`

    })
  }

  getCompradores() {
    this.core.getAll().subscribe(res => {
      const { results } = res;
      if (!results) { return }
      this.auth.userData$.subscribe(user => {
        this.compradoresParaSorteio = results.filter((elem: INums) => elem?.dataCompra);
        this.itens = results.filter((elem: INums) => elem?.vendedor === user?.email);
      })

    })
  }

  checkIsPago(item: boolean) {

    return item

  }

  updateStatus(num: INums, event: any) {
    const { checked } = event;
    const item: INums = { ...num, pago: checked }
    this.core.updateOne(item).subscribe(res => {
    })

  }


  openDelete(data: any) {
    const dialogRef = this.dialog.open(EdialogRemoveComponent, { data });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) { return }
      this.getCompradores();
    });
  }

  openSorteio() {
    const dialogRef = this.dialog.open(
      DialogSorteioComponent,
      {
        data: this.compradoresParaSorteio, height: "calc(100% - 30px)",
        width: "calc(100% - 30px)",
        maxWidth: "100%",
        maxHeight: "100%"
      });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) { return }
      this.getCompradores();
    });
  }


}
