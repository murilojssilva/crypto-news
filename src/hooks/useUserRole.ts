export function formatUserRole(role: string) {
  const roleMap: Record<string, string> = {
    admin: 'Administrador',
    costumer: 'Cliente',
    editor: 'Editor',
  }

  return roleMap[role] || 'Desconhecido'
}
