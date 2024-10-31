export interface IDepartment {
  id: string;
  name: string;
  code: string;
  createdAt: string;
}
export interface ICreateDepartmentDto {
  name: string;
  code: string;
}

export interface IEmployee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  age: number;
  salary: number;
  department: string;
}
export interface ICreateEmployeeDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  salary: number;
  department: string;
}
