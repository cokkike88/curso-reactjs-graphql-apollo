import React, { Fragment } from 'react';


const ProductReview = ({quantity, product}) => {
    return ( 
        <Fragment>
            <div  className="product-container mb-4 p-4">
                <p className="card-text font-weight-bold">
                    Nombre del producto:
                    <span className="font-weight-normal">{product.name}</span>
                </p>
                <p className="card-text font-weight-bold">
                    Cantidad:
                    <span className="font-weight-normal">{quantity}</span>
                </p>
                <p className="card-text font-weight-bold">
                    Precio:
                    <span className="font-weight-normal">$ {product.price}</span>
                </p>
            </div>
        </Fragment>

     );
}
 
export default ProductReview;