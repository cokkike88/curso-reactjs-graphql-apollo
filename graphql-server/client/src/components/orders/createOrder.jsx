import React from 'react';
import { Mutation } from 'react-apollo';
import { createOrder } from '../../mutations';
import { withRouter } from 'react-router-dom';

const orderValidation = (props) => {
    let flag = !props.products || props.total <= 0;
    return flag;
}

const CreateOrder = (props) => {
    return ( 

        <Mutation 
            mutation={createOrder}
            onCompleted={ () => props.history.push('/client')}
        >
            {addOrder => (
                <button
                    disabled={orderValidation(props)}
                    className="btn btn-warning mt-4"
                    type="button"
                    onClick={e => {
                        
                        // console.log(props.products);
                        let productsInput = props.products.map(({name, price, stock, ...object}) => object)
                        // console.log(productsInput);

                        const input = {
                            orders: productsInput,
                            total: props.total,
                            client: props.clientId
                        }

                        // console.log('input', input);

                        addOrder({
                            variables: {input}
                        })
                    }}>
                    Generar pedido
                </button>
            )}
        </Mutation>

     );
}
 
export default withRouter(CreateOrder);