import React, {Fragment} from 'react';
import Clients from './clients';

const Panel = () => {
    return ( 
        <Fragment>
            <h1 className="text-center my-5">Top 10 Clientes que mas compran</h1>
            <Clients />
        </Fragment>
     );
}
 
export default Panel;