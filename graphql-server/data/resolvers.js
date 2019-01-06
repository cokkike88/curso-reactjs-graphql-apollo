import mongoose from 'mongoose';
import { Clients } from './db';

export const resolvers = {
    Query: {
        getClient : ({id}) => {
            return new Client(id, clientDB[id]);
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
        }
    }
}
