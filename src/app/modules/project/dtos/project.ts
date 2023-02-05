export interface IProject {
  id: string;
  title: string;
  isClosed: boolean;
  location: string;
  filesAt: string;
  createAt: Date;
  startedAt: Date;
  endedAt: Date;
}

export interface Customer {
  createAt: string;
  firstName: string;
  id: string;
  lastName: string;
  phoneNumber: string;
}
