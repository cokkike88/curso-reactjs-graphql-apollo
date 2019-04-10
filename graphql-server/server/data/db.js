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


// product definition
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    stock: Number
});

const Products = mongoose.model('Products', productSchema);

const orderSchema = new mongoose.Schema({
    orders: Array,
    total: Number,
    date: Date,
    client: mongoose.Types.ObjectId,
    status: String
})

const Orders = mongoose.model('Orders', orderSchema);

export { Clients, Products, Orders };