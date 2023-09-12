import { UserInterface } from 'interfaces/user';
import { ClientInterface } from 'interfaces/client';
import { GetQueryInterface } from 'interfaces';

export interface MarketingManagerInterface {
  id?: string;
  user_id: string;
  client_id: string;
  date_created?: any;
  date_updated?: any;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  client?: ClientInterface;
  _count?: {};
}

export interface MarketingManagerGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  client_id?: string;
}
