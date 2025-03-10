export function formatUserPlan(plan: string) {
  const roleMap: Record<string, string> = {
    premium: 'Premium',
    free: 'Gratuito',
  }

  return roleMap[plan] || 'Desconhecido'
}
