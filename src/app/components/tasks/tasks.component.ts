import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

enum Prioridade {
  ALTA = 'ALTA',
  MEDIA = 'MEDIA',
  BAIXA = 'BAIXA'
}

interface Task {
  id: number;
  titulo: string;
  descricao: string;
  prioridade: Prioridade;
  prazo: string;
  usuarioDestino: string;
}

@Component({
  selector: 'app-tasks',
  imports: [FormsModule, MdbFormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  readonly Prioridade = Prioridade;

  task: Task = this.criarTaskVazia();
  lista: Task[] = [];
  taskEmEdicaoId: number | null = null;
  mensagemErro = '';
  private proximoId = 1;

  salvarTask(): void {
    if (!this.formularioValido()) {
      this.mensagemErro = 'Preencha todos os campos da tarefa.';
      return;
    }

    this.mensagemErro = '';

    if (this.taskEmEdicaoId === null) {
      this.lista.push({ ...this.task, id: this.proximoId++ });
    } else {
      const indice = this.lista.findIndex((item) => item.id === this.taskEmEdicaoId);

      if (indice !== -1) {
        this.lista[indice] = { ...this.task, id: this.taskEmEdicaoId };
      }
    }

    this.cancelarEdicao();
  }

  editarTask(task: Task): void {
    this.task = { ...task };
    this.taskEmEdicaoId = task.id;
    this.mensagemErro = '';
  }

  excluirTask(id: number): void {
    this.lista = this.lista.filter((task) => task.id !== id);

    if (this.taskEmEdicaoId === id) {
      this.cancelarEdicao();
    }
  }

  cancelarEdicao(): void {
    this.task = this.criarTaskVazia();
    this.taskEmEdicaoId = null;
    this.mensagemErro = '';
  }

  private formularioValido(): boolean {
    return Boolean(
      this.task.titulo.trim() &&
      this.task.descricao.trim() &&
      this.task.prazo &&
      this.task.usuarioDestino.trim()
    );
  }

  private criarTaskVazia(): Task {
    return {
      id: 0,
      titulo: '',
      descricao: '',
      prioridade: Prioridade.ALTA,
      prazo: '',
      usuarioDestino: ''
    };
  }
}
