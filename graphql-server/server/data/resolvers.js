import mongoose from 'mongoose';
import { Clients, Products } from './db';

export const resolvers = {
    Query: {
        getClients : (root, { limit, offset }) => {
            return Clients.find({}).limit(limit).skip(offset);
        },
        getClient : (root, {id}) => {
            return new Promise ((resolve, reject) => {
                Clients.findById(id, (error, client) => {
                    if(error)
                        reject(error);
                    else
                        resolve(client);
                })
            })
        },
        totalClients: (root) => {
            return new Promise((resolve, reject) => {
                Clients.countDocuments({}, (error, count) => {
                    if(error) reject(error);
                    else resolve(count);
                })
            })
        },
        getProducts: (root, {limit, offset}) => {
            return Products.find({}).limit(limit).skip(offset);
        }
    },
    Mutation: {
        addClient : (root, {input}) => {
            console.log('ADD CLIENT');
            const newClient = new Clients({
                name: input.name,
                lastName: input.lastName,
                company: input.company,
                emails: input.emails,
                age: input.age,
                type: input.type,
                orders: input.orders
            })
            // newClient.id = newClient._id;

            console.log('atnes de la promesa');
            return new Promise((resolve, reject) => {
                newClient.save((error) => {
                    if(error)
                        reject(error);
                    else
                        resolve(newClient);
                })
            })
        },
        updateClient : (root, {input}) => {
            return new Promise ((resolve, reject) => {
                Clients.findOneAndUpdate({ _id : input.id }, input, { new: true},  (error, client) => {
                    if(error)
                        reject(error);
                    else
                        resolve(client);
                })
            })
        },
        deleteClient : (root, {id}) => {
            return new Promise ((resolve, reject) => {
                Clients.findOneAndRemove({_id: id}, (error) => {
                    if(error)
                        reject(error);
                    else
                        resolve("Se elimino correctamente");
                })
            })
        },
        addProduct: (root, {input}) => {
            const newProduct = new Products({
                name: input.name,
                price: input.price,
                stock: input.stock
            });

            // mongo db crea el ID que se asigna al objeto
            newProduct.id = newProduct._id;

            return new Promise((resolve, reject) => {
                newProduct.save((error) => {
                    if(error) reject(error);
                    else resolve(newProduct);
                })
            });
        }        
    }
}
