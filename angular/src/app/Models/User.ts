import { Role } from "./Role.enum";

export class User{
    id?:number;
    username?:string;
    email?:string;
    password?:string;
    numtel?:number;
    role?:Role;
}
