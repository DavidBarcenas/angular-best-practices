import {Role} from './role.model';

export interface User {
  id: number;
  name: string;
  lastName: string;
  secondLastName: string;
  email: string;
  status: boolean;
  dateCreated: string;
  dateLastLogin: string;
  roleId: number;
  role: Role;
}
