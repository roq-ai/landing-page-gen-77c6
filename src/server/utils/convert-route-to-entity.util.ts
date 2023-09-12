const mapping: Record<string, string> = {
  clients: 'client',
  'content-creators': 'content_creator',
  'landing-pages': 'landing_page',
  'marketing-managers': 'marketing_manager',
  'team-members': 'team_member',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
