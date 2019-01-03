class Client {
    constructor( id, {name, lastName, company, emails, age, type, orders}){
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.company = company;
        this.emails = emails;
        this.age = age;
        this.type = type;
        this.orders = orders;
    }
}

const clientDB = {};

// RESOLVER
const resolvers = {
    getClient : ({id}) => {
        return new Client(id, clientDB[id]);
    },
    addClient : ({input}) => {
        const id = require('crypto').randomBytes(10).toString('hex');
        clientDB[id] = input;
        return new Client(id, input);
    }
};

export default resolvers;