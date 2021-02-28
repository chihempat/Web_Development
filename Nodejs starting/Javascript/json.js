class boy {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.display = function() {
            console.log(`${this.name} is ${this.age}`)
        }

    }
}

let b = new boy("rahul", "50");
b.display();