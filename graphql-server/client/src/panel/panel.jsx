import React, {Fragment} from 'react';
import Clients from './clients';
import Sellers from './sellers';

const Panel = () => {
    return ( 
        <Fragment>
            <h1 className="text-center my-5">Top 10 Clientes que mas compran</h1>
            <Clients />
            <h1 className="text-center my-5">Top 10 Vendedores que mas compran</h1>
            <Sellers />
        </Fragment>
     );
}
 
export default Panel;