import { BaseEntity } from '@/shared/types';

export interface UserModel extends BaseEntity {
  name: string;
  avatar_url: string;
  roles: string;
  email: string;
  password: string;
}
