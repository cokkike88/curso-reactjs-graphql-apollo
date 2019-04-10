import React, { Component, Fragment } from 'react';

class Product extends Component {
    state = {  }
    render() { 
        const {product} = this.props;      
        
        return ( 
            <Fragment>
                <tr>
                    <td>{product.name}</td>
                    <td>$ {product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                        <input type="number"
                            min="1"
                            className="form-control"
                            onChange={e => {
                                if(e.target.value > product.stock){
                                    e.target.value = 0;
                                }

                                this.props.changeQuantity(e.target.value, this.props.index);
                            }}
                        />
                    </td>
                    <td>
                        <button type="button"
                            className="btn btn-danger font-weight-bold"
                            onClick={this.props.deleteProduct(product.id)}
                        >
                            &times; Eliminar
                        </button>
                    </td>
                </tr>
            </Fragment>
         );
    }
}
 
export default Product;