import { benitoJrz, Person } from "./data.js";
import personajes from "./data.js"; /*Solo puedo importar una de este modo por archivo*/

console.log(benitoJrz);

/*Desestructuramos*/

const{name,title,Birthdate,nickname,children} = benitoJrz;

const BenitoObject = new Person(name,title,nickname,Birthdate,children);

console.log(BenitoObject.getTitle());
BenitoObject.printName();
