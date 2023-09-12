import { ClientInterface } from 'interfaces/client';
import { GetQueryInterface } from 'interfaces';

export interface LandingPageInterface {
  id?: string;
  title: string;
  content: string;
  client_id: string;
  date_created?: any;
  date_updated?: any;
  created_at?: any;
  updated_at?: any;

  client?: ClientInterface;
  _count?: {};
}

export interface LandingPageGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  content?: string;
  client_id?: string;
}
