import React from 'react';
import { Query } from 'react-apollo';
import { getTopSellers } from '../querys';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const Sellers = () => {
    return (  
        <Query query={getTopSellers} pollInterval={1000}>
            {({loading, error, data}) => {
                if(error) return `Error ${error.message}`;
                if(loading) return 'Cargando...';

                console.log(data);
                let topSellerGraphic = [];

                data.topSellers.map((order, index) => {
                    topSellerGraphic[index] = {
                        ...order.seller[0],
                        total: order.total
                    }
                });

                console.log(topSellerGraphic);

                return (
                    <BarChart width={600} height={300} data={topSellerGraphic}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend />
                        <Bar dataKey="total" fill="#6148b9" />
                    </BarChart>
                )
            }}
        </Query>
    );
}
 
export default Sellers;