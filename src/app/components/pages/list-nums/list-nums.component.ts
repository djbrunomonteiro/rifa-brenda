import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialSharedModule } from '../../../modules/material-shared/material-shared.module';
import { CoreService } from '../../../services/core.service';
import { BehaviorSubject, Subject, interval, takeUntil } from 'rxjs';
import { INums } from '../../../models/nums';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogCheckoutComponent } from '../../shared/dialog-checkout/dialog-checkout.component';
import { SecretPipe } from '../../../pipes/secret.pipe';

@Component({
  selector: 'app-list-nums',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialSharedModule,
    SecretPipe
  ],
  templateUrl: './list-nums.component.html',
  styleUrl: './list-nums.component.scss'
})
export class ListNumsComponent implements OnInit, AfterViewInit, OnDestroy {

  numeros$: BehaviorSubject<INums[]> = new BehaviorSubject<INums[]>([]);
  form = this.fb.group({
    select: this.fb.control([], { validators: [Validators.required]}),
    filter: ['disponivel']
  });

  ctrlSelect: any[] = [];

  loading = false;
  houveError = false;

  timer = interval(30000);
  unsubscribeSignal = new Subject();

  constructor(
    private core: CoreService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { }



  ngOnInit(): void {
    this.setNums()
  }

  ngAfterViewInit(): void {
    this.form.valueChanges.subscribe(c => {
      if (!c.select) { return }
      this.ctrlSelect = c.select?.map((elem: any) => elem?.numero)

    })
  }

  setNums() {
    this.loading= true
    this.numeros$.next([]);
    this.ctrlSelect = [];
    this.form.patchValue({ select: [] });
    this.core.getAll().subscribe(res => {
      this.loading= false;
      if (res.status !== 200) { 
        this.core.showMessage('Ops algo deu errado, tente novamente mais tarde!');
        this.houveError = true
        return 
      }
      this.numeros$.next(res.results)
      this.houveError = false;

    });

    this.updateList();
  }


  openCheckout() {
    if(!this.form.value.select?.length){return}
    
    const dialogRef = this.dialog.open(DialogCheckoutComponent, { data: this.form.value.select, disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) { return }
      this.setNums();
    });
  }

  updateList(){
    this.timer.pipe(
      takeUntil(this.unsubscribeSignal)
    )
    .subscribe(() => {
      this.core.getAll().subscribe(res => {
        console.log(res);
        
        if(res.status !== 200){return}
        this.numeros$.next(res.results)
      })

    })
  }

  ngOnDestroy(): void {
    this.unsubscribeSignal.next(true);
    this.unsubscribeSignal.complete();
  }



}
