import React, { Component, Fragment } from 'react';
import ClientData from './clientData';
import { Query } from 'react-apollo';
import { products_query } from '../../querys';
import OrderContent from './orderContent';
import { withRouter } from 'react-router-dom';

class NewOrder extends Component {
    state = {  }
    render() { 
        let {id} = this.props.match.params;
        // console.log(this.props.session);
        let sellerId = this.props.session.getUser.id;
        
        return ( 
            <Fragment>
                <h1 className="text-center">Nuevo Pedido</h1>
                <div className="row">
                    <div className="col-md-3">
                        <ClientData clientId={id} />
                    </div>
                    <div className="col-md-9">
                    <Query query={products_query} variables={{stock: true}} pollInterval={1000}>
                        {({ loading, error, data}) => {
                            if(loading) return (
                                <div className="spinner">
                                    <div className="double-bounce1"></div>
                                    <div className="double-bounce2"></div>
                                    <div className="double-bounce3"></div>
                                </div>
                            );

                            if(error) return `Error ${error.message}`;
                            console.log(data);

                            return (
                                <OrderContent 
                                    products={data.getProducts} 
                                    clientId={id} 
                                    sellerId={sellerId}
                                />
                            )
                            
                        }}
                        </Query>
                    </div>
                </div>
            </Fragment>
         );
    }
}
 
export default withRouter(NewOrder);