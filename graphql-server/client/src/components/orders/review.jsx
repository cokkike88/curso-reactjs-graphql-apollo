import React, { Fragment } from 'react';
import Product from './product';

const Review = (props) => {
    const products = props.products;

    if(products.length === 0) return null;
    return ( 
        <Fragment>
            <h2 className="text-center my-5">Resumen y Cantidades</h2>
            <table className="table">
                <thead className="bg-success text-light">
                    <tr className="font-weight-bold">
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Inventario</th>
                        <th>Cantidad</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <Product key={product.id}
                            id={product.id}
                            product={product}
                            index={index}
                            changeQuantity={props.changeQuantity}
                            deleteProduct={props.deleteProduct}/>
                    ))}
                </tbody>
            </table>
        </Fragment>
     );
}
 
export default Review;