import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:32732/clients', { userNewUrlParser: true});

// client defination
const clientSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    company: String,
    emails: Array,
    age: Number,
    type: String,
    orders: Array
})

const Clients = mongoose.model('clients', clientSchema);

export { Clients };