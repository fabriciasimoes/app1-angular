import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Frase } from './../shared/frase.model';
import { FRASES } from './frase-mock'
@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {
  public frases: Frase[] = FRASES
  public instrucao: string = 'Traduza a frase: ' 
  public resposta: string = ''
  
  public rodada: number = 0
  public rodadaFrase: Frase

  public progresso: number = 0
  public tentativas: number = 3
  @Output() public encerrarJogo = new EventEmitter()

  constructor() { 
    this.atualizaRodada()
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    
  }

  public atualizaResposta(resposta: Event): void{
    this.resposta = (<HTMLInputElement>resposta.target).value
    //console.log(this.resposta)
  }

  public verificarResposta(): void {

    if (this.rodadaFrase.frasePtBr == this.resposta){      
      
      //trocar pergunta da rodada
      this.rodada++
     
      //progresso
      this.progresso = this.progresso + (100 / this.frases.length)
   
      //
      if (this.rodada == this.frases.length) {
        this.encerrarJogo.emit('vitória')
      }
      //atualiza o objeto rodadaFrase
      this.atualizaRodada()    

      } else {   
        //diminuir variável tentativas
        this.tentativas--

        if (this.tentativas == -1) {
          this.encerrarJogo.emit('derrota')
        }
      }
      
  }
  
  public atualizaRodada(): void {

    // define a frase da rodada com base em alguma lógica
    this.rodadaFrase = this.frases[this.rodada]
      
    //limpar resposta
    this.resposta = ''
  }
  
}
