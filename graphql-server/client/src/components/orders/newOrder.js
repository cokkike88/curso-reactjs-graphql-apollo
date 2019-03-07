import React, { Component, Fragment } from 'react';
import ClientData from './clientData';
import { Query } from 'react-apollo';
import { products_query } from '../../querys';
import OrderContent from './orderContent';

class NewOrder extends Component {
    state = {  }
    render() { 
        let {id} = this.props.match.params;
        
        return ( 
            <Fragment>
                <h1 className="text-center">Nuevo Pedido</h1>
                <div className="row">
                    <div className="col-md-3">
                        <ClientData clientId={id} />
                    </div>
                    <div className="col-md-9">
                    <Query query={products_query}>
                        {({ loading, error, data}) => {
                            if(loading) return (
                                <div>
                                    <div className="spinner"></div>
                                    <div className="double-bounce1"></div>
                                    <div className="double-bounce2"></div>
                                </div>
                            );

                            if(error) return `Error ${error.message}`;
                            console.log(data);

                            return (
                                <OrderContent products={data.getProducts} clientId={id} ></OrderContent>
                            )
                            
                        }}
                        </Query>
                    </div>
                </div>
            </Fragment>
         );
    }
}
 
export default NewOrder;