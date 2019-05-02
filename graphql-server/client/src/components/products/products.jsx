import React, { Component, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { products_query } from '../../querys'
import { Link } from 'react-router-dom';
import { removeProduct } from '../../mutations';
import Success  from '../alerts/success';
import Paginador from '../paginador';

class Products extends Component {
    limit = 5;
    state = { 
        alert: {
            show: false,
            message: ''
        },
        paginador: {
            offset: 0,
            actuality: 1
        }
     }

     nextPage = () => {
         this.setState({
             paginador: {
                 offset: this.state.paginador.offset + this.limit,
                 actuality: this.state.paginador.actuality + 1
             }
         })
     }

     backPage = () => {
         this.setState({
             paginador:{
                 offset: this.state.paginador.offset - this.limit,
                 actuality: this.state.paginador.actuality -1
             }
         })
     }

    render() { 

        const {alert: { show, message }} = this.state;
        const alert = (show) ? <Success strMessage={message}/> : '';

        return ( 
            <Fragment>
                <h2 className="text-center mb-5">Listado de productos</h2>
                {alert}
                <Query query={products_query} pollInterval={1000}
                    variables={{limit: this.limit, offset: this.state.paginador.offset}}>
                    {({ loading, error, data, startPolling, stopPolling}) => {
                        if(loading) return "Cargando...";
                        if(error) return `Error: ${error.message}`;
                        // console.log('products', data);

                        return (
                            <Fragment>
                                <table className="table">
                                    <thead>
                                        <tr className="table-primary">
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Precio</th>
                                            <th scope="col">Existencia</th>
                                            <th scope="col">Eliminar</th>
                                            <th scope="col">Editar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.getProducts.map(product => {
                                            const {id} = product;
                                            let {stock} = product;
                                            let className = '';

                                            if(stock < 5){
                                                className = 'table-danger text-light'
                                            }
                                            else if (stock >= 5 && stock < 10){
                                                className = 'table-warning text-light';
                                            }
                                            else{
                                                className = '';
                                            }


                                            return(
                                                <tr key={id} className={className}>
                                                    <td>{product.name}</td>
                                                    <td>{product.price}</td>
                                                    <td>{product.stock}</td>
                                                    <td>
                                                        <Mutation mutation={removeProduct} onCompleted={(data) => {
                                                            this.setState({
                                                                alert: {
                                                                    show: true,
                                                                    message: data.deleteProduct
                                                                }
                                                            }, () => {
                                                                setTimeout(() => {
                                                                    this.setState({
                                                                        alert: {
                                                                            show: false,
                                                                            message: ''
                                                                        }
                                                                    })
                                                                }, 3000)
                                                            })       
                                                            console.log(this.state.alert.message);
                                                        }}>
                                                            { eliminarProducto => (
                                                                <button type="button" className="btn btn-danger"
                                                                    onClick={ () => {
                                                                        if(window.confirm('Seguro que desea eliminar este producto?')){
                                                                            eliminarProducto({
                                                                                variables: {id}
                                                                            })
                                                                        }
                                                                    }}
                                                                >
                                                                    &times; Eliminar
                                                                </button>

                                                            )}
                                                        </Mutation>
                                                    </td>
                                                    <td>
                                                        <Link to={`/product/edit/${id}`} className="btn btn-success">
                                                            Editar Producto
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        })}                                        
                                    </tbody>
                                </table>                                        
                                <Paginador actuality={this.state.paginador.actuality}
                                            total={data.totalProducts}
                                            nextPage={this.nextPage}
                                            backPage={this.backPage}
                                            limit={this.limit}
                                />
                            </Fragment>
                        )
                    }}
                </Query>
            </Fragment>
         );
    }
}
 
export default Products;