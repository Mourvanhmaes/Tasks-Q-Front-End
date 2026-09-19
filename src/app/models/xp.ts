// MOCK: metricas da tela de XP ainda nao vem de service/API.

export interface XpMetricCardData {
  icon: string;
  iconModifier: 'primary' | 'success' | 'streak';
  title: string;
  value: string;
  description: string;
}
