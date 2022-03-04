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

export interface Role {
  name: string;
  status: boolean;
  description: string;
  userAccountType: string;
  corporateAccountId: number;
  id: number;
}
