///PART ONE

class Vehicle {
    constructor(make, model, year) {   //???QUESTION: WOULD NOT LET ME USE
        this.make = make;              //const(make,model,year) = this 
        this.model = model;
        this.year = year;
    }
    honk(){
        return "Beep!";
    }
    toString(){
        return `This vehicle is a ${this.make} ${this.model} from ${this.year}`
    }
}

// TESTS PASSED
// let myFirstVehicle = new Vehicle("Honda", "Monster Truck", 1999);
// console.log("make = ", myFirstVehicle.make);
// console.log(myFirstVehicle.honk());
// console.log(myFirstVehicle.toString());

//PART TWO

class Car extends Vehicle {
    constructor(make, model, year){
        super(make, model, year);
        this.numWheels = 4;
    }
}

//TESTS PASSED
// let myFirstCar = new Car("Toyota","Corolla",2005);
// myFirstCar.toString();// "The vehicle is a Toyota Corolla from 2005."
// myFirstCar.honk();// "Beep."
// myFirstCar.numWheels;// 4


//PART THREE

class Motorcycle extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year);
        this.numWheels = 2;
    }
    revEngine() {
        return "VROOM!!!"
    }
}

//PART FOUR

class Garage {
    constructor(capacity) {
        this.capacity = capacity;
        this.vehicles = [];

    }
    add(vehicle) {         
        if(this.vehicles.length + 1 > this.capacity) {
            return `Sorry we are full!`;
        } else if(vehicle instanceof Vehicle) {
            this.vehicles.push(this.vehicle)
            return `parked successfully`;
        } else {
            return `Only vehicles are allowed in here!`;
        }

    }
}