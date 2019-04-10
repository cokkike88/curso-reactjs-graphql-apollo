import React, { Component, Fragment } from 'react';
import { Query }  from 'react-apollo';
import { findProduct } from '../../querys';
import EditProductForm from './editProductForm';

class EditProduct extends Component {
    state = {  }
    render() { 
        const {id} = this.props.match.params;
        return ( 
            <Fragment>
                <h2 className="text-center">EDITAR PRODUCTO</h2>
                <div className="row justity-content-center">
                    <Query query={findProduct} variables={{id}}>
                        {({ loading, error, data, refetch}) => {
                            if(loading) return 'Cargando...';
                            if(error) return `Error! ${error.message}`;

                            // console.log(data);
                            return(
                                // el refetch es para refrescar el query
                                <EditProductForm product={data} id={id} refetch={refetch} />
                            )
                        }}
                    </Query>
                </div>
            </Fragment>
         );
    }
}
 
export default EditProduct;