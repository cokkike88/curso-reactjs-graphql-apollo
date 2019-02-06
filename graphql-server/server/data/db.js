import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:32732/clients', { userNewUrlParser: true, useFindAndModify: false});

// client defination
const clientSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    company: String,
    emails: Array,
    age: Number,
    type: String,
    orders: Array
})

const Clients = mongoose.model('clients', clientSchema);



const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    stock: Number
});

const Products = mongoose.model('Products', productSchema);

export { Clients, Products };