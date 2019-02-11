
import React, { Component, Fragment } from 'react';
import { createProduct } from '../../mutations';
import { Mutation} from 'react-apollo';

const initailState = {
    name: '',
    price: '',
    stock: ''
}

class NewProduct extends Component {
    state = { 
        ...initailState
     }

     cleanState = () => {
         this.setState({
             ...initailState
         })
     }

     onChangeInputs = e => {
         const {name, value} = e.target;
        //  console.log(name, ':', value);
         this.setState({
             [name]: value
         })
     }

     validatorForm = () => {
         const {name, price, stock} = this.state;
         const flag = !name || !price || !stock;
        //  console.log(flag);
         return flag;
     }

     createdNewProduct = (e, newProductFunction) => {
        e.preventDefault();
        newProductFunction().then(data => {
            this.cleanState();
            this.props.history.push('/product');
        })
     }

    render() { 
        const { name, price, stock } = this.state;
        const input = {
            name,
            price: Number(price),
            stock: Number(stock)
        }
        // console.log(input);

        return ( 
            <Fragment>
                <h1 className="text-center mb-5">Nuevo Producto</h1>
                <div className="row justify-content-center">
                    <Mutation mutation={createProduct} variables={{input}}>
                        {(newProductFunction, {loading, error, data}) => {
                            return (
                                <form className="col-md-8"
                                    onSubmit={e => this.createdNewProduct(e, newProductFunction)}
                                >
                                    <div className="form-group">
                                        <label>Nombre:</label>
                                        <input 
                                            type="text"
                                            name="name" 
                                            className="form-control" 
                                            placeholder="Nombre del Producto"
                                            onChange={this.onChangeInputs}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Precio:</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">$</div>
                                            </div>
                                            <input 
                                                type="number" 
                                                name="price" 
                                                className="form-control" 
                                                placeholder="Precio del Producto"
                                                onChange={this.onChangeInputs}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Stock:</label>
                                        <input 
                                            type="number" 
                                            name="stock" 
                                            className="form-control" 
                                            placeholder="stock del Producto" 
                                            onChange={this.onChangeInputs}
                                        />
                                    </div>
                                    <button 
                                        disabled={this.validatorForm()}
                                        type="submit" 
                                        className="btn btn-success float-right">
                                            Crear Producto
                                    </button>
                                </form>
                            )
                        }}
                    </Mutation>
                </div>
            </Fragment>
            
         );
    }
}
 
export default NewProduct;