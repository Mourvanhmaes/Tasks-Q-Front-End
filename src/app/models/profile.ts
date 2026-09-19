// MOCK: dados da tela de perfil ainda nao vem de service/API.

/** Linha da lista dt/dd de "Dados pessoais". */
export interface InfoListItem {
  label: string;
  value: string;
}

/** Item de "Atividade recente". */
export interface ActivityItem {
  icon: string;
  /** texto antes do destaque, ex.: "Concluiu" */
  text: string;
  /** trecho em negrito, ex.: o nome da tarefa */
  highlight: string;
  time: string;
  xp: string;
}
