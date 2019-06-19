import mongoose from 'mongoose';
import { Clients, Products, Orders, Users } from './db';
import { isRegExp } from 'util';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';


const ObjectId = mongoose.Types.ObjectId;

dotenv.config({path: 'variables.env'});
const createToken = (userEntity, secret, expiresIn) => {
    let {user} = userEntity;

    return jwt.sign({user}, secret, {expiresIn});
}


export const resolvers = {
    Query: {
        getClients : (root, { limit, offset, sellerId }) => {
            let filter;
            if(sellerId){
                filter = {sellerId : new ObjectId(sellerId)};
            }
            return Clients.find(filter).limit(limit).skip(offset);
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
        totalClients: (root, {sellerId}) => {
            return new Promise((resolve, reject) => {
                let filter;
                if(sellerId){
                    filter = {sellerId : new ObjectId(sellerId)};
                }
                Clients.countDocuments(filter, (error, count) => {
                    if(error) reject(error);
                    else resolve(count);
                })
            })
        },
        getProducts: (root, {limit, offset, stock}) => {
            let filter ;
            if(stock){
                filter = { stock: {$gt: 0}};
            }
            return Products.find(filter).limit(limit).skip(offset);
        },
        getProduct: (root, {id}) => {
            return new Promise ((resolve, reject) => {
                Products.findById(id, (error, product) => {
                    if(error) reject(error);
                    else resolve(product);
                })
            })
        },
        totalProducts: (root) => {
            return new Promise ((resolve, reject) => {
                Products.countDocuments({}, (error, count) => {
                    if(error) reject(error);
                    else resolve(count);
                })
            })
        },
        getOrders: (root, {clientId}) => {
            return new Promise((resolve, reject) => {
                Orders.find({client: clientId}, (error, order) => {
                    if(error) {
                        console.log(`error find ${error}`);
                        reject(error);
                    }
                    else {
                        // console.log(`resultado find ${order}`);
                        resolve(order);
                    }
                })
            })
        },
        topClients: (root) => {
            return new Promise((resolve, reject) => {
                Orders.aggregate([
                    {
                        $match: { status: "COMPLETED"}
                    },
                    {
                        $group: {
                            _id: "$client",
                            total: { $sum: "$total" }
                        }
                    },
                    {
                        $lookup: {
                            from: "clients",
                            localField: "_id",
                            foreignField: "_id",
                            as: "client"
                        }
                    },
                    {
                        $sort: { total: -1}
                    },
                    {
                        $limit: 10
                    }
                ], (error, result) => {
                    if(error) reject(error);
                    else resolve(result);
                })
            })
        },
        topSellers: (root) => {
            return new Promise((resolve, reject) => {
                Orders.aggregate([
                    {
                        $match: { status: "COMPLETED"}
                    },
                    {
                        $group: {
                            _id: "$sellerId",
                            total: { $sum: "$total" }
                        }
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "_id",
                            foreignField: "_id",
                            as: "seller"
                        }
                    },
                    {
                        $sort: { total: -1}
                    },
                    {
                        $limit: 10
                    }
                ], (error, result) => {
                    if(error) reject(error);
                    else resolve(result);
                })
            })
        },
        getUser: (root, args, {currentUser}) => {
            if(!currentUser){
                return null;
            }
            console.log(currentUser);

            const user = Users.findOne({user: currentUser.user });

            return user;
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
                orders: input.orders,
                sellerId: input.sellerId
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
                Clients.findOneAndDelete({_id: id}, (error) => {
                    if(error)
                        reject(error);
                    else
                        resolve("Se elimino correctamente.");
                })
            })
        },
        // ==================================================== PRODUCTS
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
        },
        updateProduct: (root, {input}) =>{
            return new Promise ((resolve, reject) => {
                Products.findOneAndUpdate({ _id: input.id}, input, { new: true}, (error, product) => {
                    if (error) reject(error);
                    else resolve(product);
                })
            })
        },
        deleteProduct: (root, {id}) => {
            return new Promise ((resolve, reject) => {
                Products.findOneAndDelete({_id: id}, (error) => {
                    if(error) reject(error);
                    else resolve("Se elimino el producto correctamente.");
                })
            })
        },
        // ========================================================= ORDERS
        addOrder: (root, {input}) => {
            const newOrder = new Orders({
                orders: input.orders,
                total: input.total,
                date: new Date(),
                client: input.client,
                status: "PENDING",
                sellerId: input.sellerId
            });

            newOrder.id = newOrder._id;

            return new Promise ((resolve, reject) => {
                
                newOrder.save((error) => {
                    if(error) reject(error);
                    else resolve(newOrder);
                })
            })
        },
        updateOrderStatus: (root, {input}) => {

            let { status } = input;
            let instruction;
            if(status === 'COMPLETED'){
                instruction = '-';
            }
            else if(status === 'CANCELED'){
                instruction = '+';
            }

            input.orders.forEach(element => {
                    
                Products.updateOne({_id: element.id}, {
                    $inc:{
                        stock: `${instruction}${element.quantity}`
                    }
                }, function(e) {
                    if(e) return new Error(e);
                })
            });


            return new Promise ((resolve, reject) => {
                Orders.findOneAndUpdate({_id: input.id}, input, {new: true}, (error) => {
                    if(error) reject(error);
                    else resolve('Se actualizo la orden');
                });
            })
        },
        // ========================================================= USERS
        createUser: async (root, {user, name, pass, role}) => {

            let userExist = await Users.findOne({user});

            if(userExist){
                throw new Error('El usuario ya existe');
            }

            const newUser = await new Users({
                user,
                name,
                pass,
                role
            }).save();

            return "Usuario creado correctamente";
            // console.log(newUser);
        },
        authUser: async (root, {user, pass}) => {
            let userEntity = await Users.findOne({user});

            if(!userEntity){
                throw new Error('Usuarion no encontrado');
            }

            let correctPass = await bcrypt.compare(pass, userEntity.pass);

            if(!correctPass){
                throw new Error("Password Incorrecto");
            }
            
            let token = createToken(userEntity, process.env.SECRET, '1hr'); 
            console.log('TOKEN', token);

            return {
                token
            }
        }
    }
}
