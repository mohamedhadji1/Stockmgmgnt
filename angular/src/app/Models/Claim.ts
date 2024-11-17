import { Returns } from "./Returns";
import { User } from "./User";

export class Claim{
    id!:number;

    client!:User;

    message!:string;

    returns: Returns[] = [];

    date!: Date;
}