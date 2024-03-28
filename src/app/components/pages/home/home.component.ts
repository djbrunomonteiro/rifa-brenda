import { Component, OnInit } from '@angular/core';
import { INums } from '../../../models/nums';
import { CoreService } from '../../../services/core.service';
import { MaterialSharedModule } from '../../../modules/material-shared/material-shared.module';
import { ListNumsComponent } from '../list-nums/list-nums.component';
import { concatMap, delay, from, interval, map, mergeMap, of } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ListNumsComponent,
    MaterialSharedModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private core: CoreService){}

  ngOnInit(): void {

  }

  async generateNums(){
    const nums: INums[] = [];
    return new Promise<INums[]>((resolve) => {
      for (let index = 1; index <= 300; index++) {
        const num: INums = {
          numero: index,
          comprador: '',
          pago: false,
          vendedor: '',
          dataCompra: '',
          whatsapp: ''
        }
  
        nums.push(num)
  
      }

      resolve(nums);
      
    })
  }

  // async create(){
  //   const nums = await this.generateNums();
  //   console.log(nums);
  //   const nums$ = from(nums)
    
  //   const result = nums$.pipe(
  //     concatMap(num => this.core.addOne(num))
  //   ).subscribe(r =>{
  //     console.log(r);
  //   })
    
  // }

}
