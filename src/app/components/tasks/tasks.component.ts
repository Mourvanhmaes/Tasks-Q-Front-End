import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule} from 'mdb-angular-ui-kit/forms';


enum Prioridade{
  ALTA = 'ALTA',
  MEDIA = 'MEDIA',
  BAIXA = 'BAIXA'
}

interface Tasks{
  id: number;
  titulo: string;
  descricao: string;
  prioridade: Prioridade;
  prazo: string;
  usuarioDestino: string;
}

let contador = 1;

@Component({
  selector: 'app-tasks',
  imports: [
    FormsModule,
    MdbFormsModule
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
    Prioridade = Prioridade;
    tasks: Tasks = {
      id: 0,
      titulo: '',
      descricao: '',
      prioridade: Prioridade.ALTA,
      prazo: '',
      usuarioDestino: ''
    };
    
    lista: Tasks[] = [      ];
    
    
    cadastrarTask(){
      this.tasks.id = contador;
      this.lista.push(this.tasks);
      console.log(this.lista[contador - 1]);
      contador++;
      this.tasks = {
        id: 0,
        titulo: '',
        descricao: '',
        prioridade: Prioridade.ALTA,
        prazo: '',
        usuarioDestino: ''
      };
    }
}
