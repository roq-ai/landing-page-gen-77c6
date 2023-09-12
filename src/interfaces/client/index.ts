import { ContentCreatorInterface } from 'interfaces/content-creator';
import { LandingPageInterface } from 'interfaces/landing-page';
import { MarketingManagerInterface } from 'interfaces/marketing-manager';
import { TeamMemberInterface } from 'interfaces/team-member';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ClientInterface {
  id?: string;
  description?: string;
  date_created?: any;
  date_updated?: any;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  content_creator?: ContentCreatorInterface[];
  landing_page?: LandingPageInterface[];
  marketing_manager?: MarketingManagerInterface[];
  team_member?: TeamMemberInterface[];
  user?: UserInterface;
  _count?: {
    content_creator?: number;
    landing_page?: number;
    marketing_manager?: number;
    team_member?: number;
  };
}

export interface ClientGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
