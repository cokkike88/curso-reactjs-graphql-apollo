import React from 'react';
import { findProduct } from '../../querys';
import { Query, Mutation } from 'react-apollo';
import ProductReview from './productReview';
import { editOrderStatus } from '../../mutations';
import '../../orders.css';

const Order = (props) => {

    let {order} = props;
    let {id, orders, total, client, status} = order;
    let date = new Date(Number(order.date));
    // console.log('order', order);
    
    let cardClass;
    if(status === 'PENDING'){
        cardClass = 'border-light';
    } else if(status === 'CANCELED'){
        cardClass = 'border-danger';
    } else if(status === 'COMPLETED'){
        cardClass = 'border-success';
    }


    return ( 
        <div className="col-md-4">
            <div className={`card mb-3 ${cardClass}`} >
                <div className="card-body">
                    <p className="card-text font-weight-bold ">Estado:
                        <Mutation mutation={editOrderStatus}>
                            {updateState => (

                                <select className="form-control my-3"
                                    value={order.status}
                                    onChange={e => {

                                        let input = {
                                            id,
                                            orders,
                                            total,
                                            date: order.date,
                                            client,
                                            status: e.target.value
                                        }

                                        console.log('input', input);
                                        updateState({
                                            variables: {input}
                                        });
                                    }}
                                >
                                        <option value="PENDING">PENDIENTE</option>
                                        <option value="COMPLETED">COMPLETADO</option>
                                        <option value="CANCELED">CANCELADO</option>
                                </select>
                            )}
                        </Mutation>
                    </p> 
                    <p className="card-text font-weight-bold">Pedido ID:
                        <span className="font-weight-normal"> {order.id}</span>
                    </p> 
                    <p className="card-text font-weight-bold">Fecha Pedido: 
                        <span className="font-weight-normal"> {date.toLocaleDateString('es-GT')}</span>
                    </p>                    

                    <h3 className="bold-text card-text text-center mb-3">Artículos del pedido</h3>
                    {
                        order.orders.map((product, index) => {
                            // console.log('producto', product);
                            let {id} = product;
                            return (
                                <Query 
                                    key={product.id} 
                                    query={findProduct}
                                    variables={{id}}>
                                    
                                    {({loading, error, data}) => {
                                        if(loading) return 'Cargando...';
                                        if(error) return `Error ${error.message}`;

                                        // console.log(data);
                                        return(
                                            <ProductReview 
                                                product={data.getProduct}
                                                quantity={product.quantity}
                                                key={product.id + index}
                                            />
                                        )
                                    }}

                                </Query>
                            )
                        })
                    }
                    <div className="d-flex align-items-center justify-content-end">
                        <p className="card-text bold-text mr-1 bg-yellow">Total:</p>
                        <p className="font-weight-normal"> $ {order.total}</p>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Order;