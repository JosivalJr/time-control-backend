import { UUID } from 'crypto';

export type timeControlType = 'in' | 'out';

export interface ITimeControl {
  id: UUID;
  employee_id: UUID;
  control_type: 'in' | 'out';
  control_time: Date;
  created_at: Date;
  updated_at: Date;
}
