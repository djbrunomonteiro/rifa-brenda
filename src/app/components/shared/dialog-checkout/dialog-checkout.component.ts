import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MaterialSharedModule } from '../../../modules/material-shared/material-shared.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoreService } from '../../../services/core.service';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { from, mergeMap } from 'rxjs';
import { INums } from '../../../models/nums';
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
@Component({
  selector: 'app-dialog-checkout',
  standalone: true,
  imports: [
    CommonModule,
    MaterialSharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    LottieComponent
  ],
  templateUrl: './dialog-checkout.component.html',
  styleUrl: './dialog-checkout.component.scss'
})
export class DialogCheckoutComponent implements OnInit {

  form = this.fb.group({
    vendedor: [''],
    pago: [false],
    comprador: ['', Validators.required],
    whatsapp: ['', Validators.required],
    dataCompra: [''],
  });

  total = 0;

  loading = true;

  options: AnimationOptions = {
    autoplay: true,
    path: '/assets/animation.json',
  };
  constructor(
    private core: CoreService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: INums[]
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.total = this.data.length * 10;
    this.form.patchValue({
      dataCompra: new Date().toISOString() 
    })

  }

  save() {
    const updateItens = this.data.map(num => (
      {
        ...num, 
        dataCompra: new Date().toISOString(),  
        whatsapp: this.form.value.whatsapp ?? '', 
        vendedor: this.form.value.comprador ?? '',  
        pago: this.form.value.pago ?? false
      }))

    const nums$ = from(updateItens)

    const result = nums$.pipe(
      mergeMap(num => this.core.updateOne(num))
    ).subscribe(r => {
      console.log(r);
    })

    // this.dialog.closeAll()


  }


}
