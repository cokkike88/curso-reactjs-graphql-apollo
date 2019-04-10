import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { getOrders } from '../../querys';
import Order from './order';

const OrdersClient = (props) => {

    
    let { clientId } = props.match.params;
    

    return ( 
        <Fragment>
            <h1 className="text-center mb-5">Pedidos del cliente</h1>

            <div className="row">
                <Query query={getOrders}
                    variables={{clientId}}
                    pollInterval={500}>
                    {({loading, error, data, startPolling, stopPolling}) => {
                        if(loading) return (
                            <div className="spinner">
                                <div className="double-bounce1"></div>
                                <div className="double-bounce2"></div>
                                <div className="double-bounce3"></div>
                            </div>
                        )
                        if(error) return `Error ${error.message}`;

                        console.log(data);
                        
                        return (
                            data.getOrders.map(order => (
                                <Order 
                                    key={order.id}
                                    order={order}
                                    clientId={clientId}
                                />
                            ))
                        )
                    }}
                </Query>
            </div>                

        </Fragment>
     );
}
 
export default OrdersClient;