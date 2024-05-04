import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MaterialSharedModule } from '../../../modules/material-shared/material-shared.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { INums } from '../../../models/nums';
import { CoreService } from '../../../services/core.service';

@Component({
  selector: 'app-edialog-remove',
  standalone: true,
  imports: [
    CommonModule,
    MaterialSharedModule,
  ],
  templateUrl: './edialog-remove.component.html',
  styleUrl: './edialog-remove.component.scss'
})
export class EdialogRemoveComponent {


  loading = false;


  constructor(
    public dialogRef: MatDialogRef<EdialogRemoveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: INums,
    private core: CoreService
  ){}

  remove(){
    this.loading = true;
    const item:INums = {...this.data, comprador: '', pago: false, dataCompra: '', vendedor: '', whatsapp: ''}
    this.core.updateOne(item).subscribe((res: any) => {
      const {status, message} = res;
      this.core.showMessage(message)
      if(status !== 200){
        this.loading = false;

        return;

      }

      this.dialogRef.close(true)
      
    })

  }



}
