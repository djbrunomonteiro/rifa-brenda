import { Component, OnInit } from '@angular/core';
import { INums } from '../../../models/nums';
import { CoreService } from '../../../services/core.service';
import { MaterialSharedModule } from '../../../modules/material-shared/material-shared.module';
import { ListNumsComponent } from '../list-nums/list-nums.component';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

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

  chavePix = environment.chavePix;
  emails = environment.emails;

  constructor(
    public core: CoreService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {

    setTimeout(() =>{
      this.auth.userData$.subscribe(user => {
        if(user){
          this.router.navigate(['/vendedor/' + user?.email]);
          return;
        }
        const email = this.activatedRoute.snapshot.params['email'];
        if (!email) {
          this.core.showMessage('Você precisa está no link do vendedor ou logado.', 5000);
          this.router.navigate(['/admin']);
          return;
        }
  
        if(!this.emails.includes(email)){
          this.core.showMessage('LINK DE VENDAS INVALIDO, verifique com o responsavel do link ou se houve error na digitação do link.', 6000 );
          this.router.navigate(['/admin']);
          return;
        }
  
      })

    }, 1000);

    this.listenRoute();


  }

  listenRoute() {
    const url = window?.location.href;
    this.setEmail(url)
 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const {url} = event;
        if(!url.includes('@')){return};
        this.setEmail(url);
      }
    });
  }

  setEmail(url: string){
    if(!url.includes('@')){return};
    const email = url.split('/vendedor/')[1];
    localStorage.setItem('email_vendedor', email);
  }


  async generateNums() {
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
