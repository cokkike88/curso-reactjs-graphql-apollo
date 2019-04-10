import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import Animated from 'react-select/lib/animated';
import Review from './review';
import CreateOrder from './createOrder';
import Error from '../alerts/error';

class OrderContent extends Component {
    state = { 
        products: [],
        total: 0
     }

    selectedProduct = (products) => {

        // console.log('evento ', products);
        this.setState({
            products
        })
    }

    changeQuantity = (quantity, index) => {
        // console.log(quantity, index);

        let {products} = this.state;
        console.log('products', products);

        

        products[index].quantity = Number(quantity);        
        
        this.setState({
            products
        }, () => {
            this.updateTotal();
        })


    }

    updateTotal = () => {
        
        let newTotal = 0;
        let {products} = this.state;
        
        if(products.length === 0){
            this.setState({
                total: 0
            })
            return;
        }

        products.map(product => newTotal += (product.quantity * product.price));
        this.setState({
            total: newTotal
        })
    }

    deleteProduct = (id) => (e) => {
        let products = [...this.state.products];
        let productsFilter = products.filter(product => product.id !== id);
        
        console.log(id, productsFilter);
        this.setState({
            products: productsFilter
        }, () => {
            this.updateTotal();
        });
    }

    render() { 

        let message = (this.state.total < 0) ? <Error strMessage="Las cantidades no pueden ser negativas" /> : '';

        return ( 
            <Fragment>
                <h2 className="text-center my-5">Seleccionar productos</h2>
                {message}
                <Select
                    onChange={this.selectedProduct}
                    options={this.props.products}
                    isMulti={true}
                    components={Animated()}
                    placeholder={'Seleccionar Productos'}
                    getOptionValue={(options) => options.id}
                    getOptionLabel={(options) => options.name}
                    value={this.state.products}
                />
                <Review products={this.state.products}
                    changeQuantity={this.changeQuantity}
                    deleteProduct={this.deleteProduct}/>
                <p className="font-weight-bold float-right mt-3">
                    Total:
                    <span className="font-weight-normal">
                        $ {this.state.total}
                    </span>
                </p>
                <CreateOrder
                    products={this.state.products}
                    total={this.state.total} 
                    clientId={this.props.clientId}/>
            </Fragment>
         );
    }
}
 
export default OrderContent;