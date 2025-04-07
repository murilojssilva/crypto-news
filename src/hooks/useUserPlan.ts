export function formatUserPlan(plan: string) {
  const roleMap: Record<string, string> = {
    premium: 'Premium',
    standard: 'Standard',
    free: 'Gratuito',
  }

  return roleMap[plan] || 'Desconhecido'
}
