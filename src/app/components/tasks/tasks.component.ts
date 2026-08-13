import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule} from 'mdb-angular-ui-kit/forms';


enum Prioridade{
  ALTA = 'ALTA',
  MEDIA = 'MEDIA',
  BAIXA = 'BAIXA'
}

interface Tasks{
  titulo: string;
  descricao: string;
  prioridade: Prioridade;
  prazo: string;
  usuarioDestino: string;
}

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
      titulo: '',
      descricao: '',
      prioridade: Prioridade.ALTA,
      prazo: '',
      usuarioDestino: ''
    };

    cadastrarTask(){
      console.log(this.tasks)
    }
}
