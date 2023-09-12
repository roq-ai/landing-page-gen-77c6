interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: [],
  tenantRoles: ['Business Owner', 'Team Member', 'Content Creator', 'Marketing Manager'],
  tenantName: 'Client',
  applicationName: 'landing Page Generator',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: ['Register business', 'Manage landing pages', 'Invite team members', 'Login to application'],
  getQuoteUrl: 'https://app.roq.ai/proposal/6ddcb121-b73c-4634-9819-ddbcb3c832b8',
};
