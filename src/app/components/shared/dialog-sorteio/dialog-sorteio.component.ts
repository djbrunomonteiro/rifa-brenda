import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MaterialSharedModule } from '../../../modules/material-shared/material-shared.module';
import { SecretPipe } from '../../../pipes/secret.pipe';
import { EdialogRemoveComponent } from '../edialog-remove/edialog-remove.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { INums } from '../../../models/nums';
import { Subject, interval, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dialog-sorteio',
  standalone: true,
  imports: [
    CommonModule,
    MaterialSharedModule,
    NgxMaskDirective,
    NgxMaskPipe,
    LottieComponent,
    EdialogRemoveComponent
  ],
  providers:[
    SecretPipe
  ],
  templateUrl: './dialog-sorteio.component.html',
  styleUrl: './dialog-sorteio.component.scss'
})
export class DialogSorteioComponent implements OnInit {

  options: AnimationOptions = {
    autoplay: true,
    path: '/assets/sorteio1.json',
  };

  textLoading = 'Cruzem os dedos, Preparando o sorteio...';
  textGanhador = '';
  textGanhadorNumero = '';
  count!: number;
  ganhador!: INums

  time$ = interval(1000);
  stopTimer$ = new Subject();

  loading = true;
  
  constructor(
    public dialogRef: MatDialogRef<DialogSorteioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: INums[],
    private secretPipe: SecretPipe
  ){}

  ngOnInit(): void {
    this.sortear();
  }

  sortear(){

    setTimeout(()=>{
      this.textLoading = 'Buscandooo o ganhador em...'
      this.options = {...this.options, path: '/assets/sorteio2.json'};
      this.time$.pipe(takeUntil(this.stopTimer$)).subscribe(time =>{
        if(time === 0){
          this.count = 10;
        }else{
          this.count = (this.count - 1)
        }

        if(time === 10){
          this.stopTimer$.next(true);
          this.loading = false;
          const indexAleatorio = this.gerarNumeroAleatorio(0, this.data.length);
          this.ganhador = this.data[indexAleatorio];
          if(this.ganhador){
            const whats = this.secretPipe.transform(this.ganhador.whatsapp)
            this.textGanhador = `Parabéns ${this.ganhador.comprador} (${whats}),`;
            this.textGanhadorNumero =  `o seu número ${this.ganhador.numero} foi o sorteado !!! `
            this.options = {...this.options, path: '/assets/sorteio3.json'}

          }
          
        }
        
      })

    },2000)
  }

  gerarNumeroAleatorio(min = 0, max: number) {
    // Valida se os valores de min e max foram informados
    if (typeof min === 'undefined' || typeof max === 'undefined') {
      throw new Error('É necessário informar os valores mínimo e máximo para gerar o número aleatório.');
    }
  
    // Valida se o valor mínimo é menor que o valor máximo
    if (min > max) {
      throw new Error('O valor mínimo deve ser menor que o valor máximo.');
    }
  
    // Gera um número aleatório entre min e max
    const aleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
  
    // Retorna o número aleatório gerado
    return aleatorio;
  }

}
