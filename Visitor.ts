/*The Visitor pattern suggests that you place the new behavior into a separate class called visitor,
instead of trying to integrate it into existing classes. The original object that had to perform the
behavior is now passed to one of the visitor’s methods as an argument, providing the method access to
all necessary data contained within the object.Should be used when you have distinct and unrelated operations
to perform across a structure of objects (element objects */

//Interface with  a method which takes the base Visitor interface as an argument.
interface IElement{
    accept(visitor:IVisitor):void
}

//concrete element
class Kid implements IElement{
    kidName:string;

    constructor(name:string){
        this.kidName = name;
    }

    accept(visitor: IVisitor): void {
        visitor.visit(this);
    }
}

//visitor interface
interface IVisitor{
    visit(element:IElement):void
}

//Concrete visitors
class Doctor implements IVisitor{
    doctorName:string;

    constructor(name:string){
        this.doctorName = name;
    }

    visit(element: IElement): void {
        let kid:Kid = element as Kid;
        console.log(`Doctor ${this.doctorName} did a checkup on ${kid.kidName}`);
    }
}

class SalesMan implements IVisitor{
    salesManName:string;

    constructor(name:string){
        this.salesManName = name;
    }

    visit(element: IElement): void {
        let kid:Kid = element as Kid;
        console.log(`Salesman ${this.salesManName} gave a promotional product to ${kid.kidName}`);
    }
}

//Object structure class. Can enmerate its elements and provide a high-level interface to
//allow the visitor to visit elements

class School{
    kids:IElement[] = [];
    constructor(){
        this.kids.push(new Kid('kid1'));
        this.kids.push(new Kid('kid2'));
        this.kids.push(new Kid('kid3'));
    }
    performOperation(visitor:IVisitor):void{
        for(let kid of this.kids ){
            kid.accept(visitor);
        }
    }
}

//client
const school:School = new School();
const visitor1 = new Doctor('Judy');
const visitor2 = new SalesMan('Sam');

school.performOperation(visitor1);
school.performOperation(visitor2);