const person = {
    firstname: 'John',
    lastname: 'Smith',
}

const { firstname: fn, lastname: ln } = person;

console.log(`${fn} ${ln}`);