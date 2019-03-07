import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { updateProduct } from '../../mutations';
import { withRouter } from 'react-router-dom';

const initialState = {
    name: '',
    price: '',
    stock: ''
}

class EditProductForm extends Component {
    
    state = { 
        ...this.props.product.getProduct
    }

    cleanState = () => {
        this.setState({
            ...initialState
        })
    }

    onChangeInputs = e => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        })
    }

    editProductForm = (e, updateProductForm) => {
        e.preventDefault();

        updateProductForm()
        .then(data => {
            this.cleanState();
        })
    }
    validatorForm = () => {
        const {name, price, stock} = this.state;
        const flag = !name || !price || !stock;
        return flag;
    }

    render() {
        const {name, price, stock} = this.state;
        const {id} = this.props;
        const input = {
            id,
            name,
            price: Number(price),
            stock: Number(stock)
        } 

        return ( 

            <Mutation 
                mutation={updateProduct}
                variables={{input}}
                key={id}
                onCompleted={() => {
                    this.props.refetch().then(()=>{
                        this.props.history.push('/product');
                    })
                }}
            >
            {( updateProductForm , {loading, error, data}) => {

                return (
                    <form 
                        className="col-md-8"
                        onSubmit={e => this.editProductForm(e, updateProductForm)}
                    >
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input 
                                onChange={this.onChangeInputs} 
                                type="text" 
                                name="name" 
                                className="form-control" 
                                placeholder="Nombre del producto"
                                value={name} />
                        </div>
                        <div className="form-group">
                            <label>Precio:</label>
                            <input 
                                onChange={this.onChangeInputs} 
                                type="number" 
                                name="price" 
                                className="form-control" 
                                placeholder="Precio del producto"
                                value={price} />
                        </div>
                        <div className="form-group">
                            <label>Stock:</label>
                            <input 
                                onChange={this.onChangeInputs} 
                                type="number" 
                                name="stock" 
                                className="form-control" 
                                placeholder="Stock del producto"
                                value={stock} />
                        </div>
                        <button 
                            disabled={ this.validatorForm() } 
                            type="submit" 
                            className="btn btn-success float-right">
                                Guardar
                        </button>
                    </form>
                )
            }}
    
            </Mutation>
         );
    }
}
 
export default withRouter(EditProductForm);