import { UUID } from 'crypto';

export interface IEmployee {
  id: UUID;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}
