let numbers = ['1', '2', '3', '4', '5']
numbers.shift();
console.log(numbers)

numbers.unshift("0")
console.log(numbers);
numbers.push(3)
console.log(numbers)
console.log(numbers.pop())
numbers.splice(2, 2, 'something');
console.log(numbers);