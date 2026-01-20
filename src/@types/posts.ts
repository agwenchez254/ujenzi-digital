export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface User {
  id: string;
  email: string;
  roles: string[];
  permissions: string[];
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string
}