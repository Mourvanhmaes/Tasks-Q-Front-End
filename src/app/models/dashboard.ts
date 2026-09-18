// MOCK: interfaces criadas apenas para tipar os blocos do dashboard que
// ainda nao tem origem em service/API. Quando o back-end existir, revisar
// cada campo (hoje varios carregam texto ja formatado, nao o dado bruto).

/** Card "Proximos feriados" — feriado em destaque. */
export interface NextHoliday {
  date: string;
  name: string;
  caption: string;
}

/** Card "Proximos feriados" — itens da lista inferior. */
export interface Holiday {
  date: string;
  name: string;
  /** modificador de cor do ponto: purple | blue | success */
  dotModifier: 'purple' | 'blue' | 'success';
}

/** Cards "Tarefas Pendentes" e "Projetos Ativos". */
export interface StatCardData {
  icon: string;
  iconModifier: 'purple' | 'blue';
  title: string;
  value: string;
  trendLabel: string;
  trendModifier: 'danger' | 'success';
  caption: string;
  /** largura da barra, ex.: '43%' */
  progress: string;
  progressModifier: 'purple' | 'blue' | 'success' | 'danger';
  total: string;
}

/** Item da lista "Meus Projetos". */
export interface ProjectListItemData {
  icon: string;
  iconModifier: 'purple' | 'violet' | 'blue';
  title: string;
  statusLabel: string;
  statusModifier: 'info' | 'danger' | 'success';
  description: string;
  tasksLabel: string;
  membersLabel: string;
  deadlineLabel: string;
  /** destaque da data: alert (atrasado), done (concluido) ou nenhum */
  deadlineModifier: 'alert' | 'done' | null;
  progress: string;
  progressModifier: 'purple' | 'blue' | 'success' | 'danger';
  percentLabel: string;
  avatars: string[];
  moreAvatars: string | null;
}

/** Linha do painel "Resumo de Tarefas". */
export interface TaskSummaryItem {
  label: string;
  count: string;
  percentLabel: string;
  progress: string;
  modifier: 'success' | 'blue' | 'danger';
}
