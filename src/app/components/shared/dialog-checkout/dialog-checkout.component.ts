import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MaterialSharedModule } from '../../../modules/material-shared/material-shared.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoreService } from '../../../services/core.service';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { from, mergeMap } from 'rxjs';
import { INums } from '../../../models/nums';
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { SecretPipe } from '../../../pipes/secret.pipe';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { EdialogRemoveComponent } from '../edialog-remove/edialog-remove.component';
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
    LottieComponent,
    SecretPipe,
    EdialogRemoveComponent
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

  loading = false;

  options: AnimationOptions = {
    autoplay: true,
    path: '/assets/animation.json',
  };

  textLoading = 'Só um minutinho, estou salvando...';

  constructor(
    private core: CoreService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogCheckoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: INums[],
    public snackBar: MatSnackBar,
    private auth: AuthService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.total = this.data.length * 10;
    this.form.patchValue({
      dataCompra: new Date().toISOString(),
      vendedor: this.auth.userData$.value?.email ?? this.activatedRoute.snapshot.params['email']
    });

    

  }

  save() {

    this.loading = true
    const updateItens = this.data.map(num => (
      {
        ...num, 
        dataCompra: new Date().toISOString(),  
        whatsapp: this.form.value.whatsapp ?? '', 
        comprador: this.form.value.comprador ?? '',  
        pago: this.form.value.pago ?? false,
        vendedor: this.form.value.vendedor ?? ''
      }))

    const nums$ = from(updateItens)

    const result = nums$.pipe(
      mergeMap(num => this.core.updateOne(num))
    ).subscribe(r => {
      setTimeout(() =>{
        this.textLoading = 'Salvo com sucesso! Boa sorte :)';
        this.options = {
          ...this.options,
          path: '/assets/animation2.json'
        }
      }, 2000)



      setTimeout(() =>{
        this.loading = false;
        this.dialogRef.close(true);
      }, 4000)
      
    })

    // this.dialog.closeAll()


  }


}
