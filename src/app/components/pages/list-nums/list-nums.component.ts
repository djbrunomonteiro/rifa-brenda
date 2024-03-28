import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MaterialSharedModule } from '../../../modules/material-shared/material-shared.module';
import { CoreService } from '../../../services/core.service';
import { BehaviorSubject } from 'rxjs';
import { INums } from '../../../models/nums';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogCheckoutComponent } from '../../shared/dialog-checkout/dialog-checkout.component';

@Component({
  selector: 'app-list-nums',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialSharedModule
  ],
  templateUrl: './list-nums.component.html',
  styleUrl: './list-nums.component.scss'
})
export class ListNumsComponent implements OnInit, AfterViewInit {

  numeros$: BehaviorSubject<INums[]> = new BehaviorSubject<INums[]>([]);
  form = this.fb.group({
    select: this.fb.control([])
  });

  ctrlSelect: any[] = [];



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
      console.log(c);
      if(!c.select){return}
      this.ctrlSelect = c.select?.map((elem: any) => elem?.numero)

    })
  }

  setNums() {
    this.core.getAll().subscribe(res => {
      if (res.error) { return }

      this.numeros$.next(res.results)
      console.log(this.numeros$.value);
    })
  }


  openCheckout() {
    const dialogRef = this.dialog.open(DialogCheckoutComponent, {data: this.form.value.select, disableClose: true});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
