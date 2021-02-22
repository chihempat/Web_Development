const sum = (num1, num2) => num1 + num2;
const PI = 3.1;
module.exports = sum;
class SomeMathObject {
    constructor() {
        console.log('object created');
    }
}

module.exports.sum = sum;
module.exports.PI = PI;
module.exports.SomeMathObject = SomeMathObject;