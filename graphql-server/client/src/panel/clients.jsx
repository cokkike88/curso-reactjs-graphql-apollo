import React from 'react';
import { Query } from 'react-apollo';
import { getTopClients } from '../querys';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const Clients = () => {
    return (  
        <Query query={getTopClients} pollInterval={1000}>
            {({loading, error, data}) => {
                if(error) return `Error ${error.message}`;
                if(loading) return 'Cargando...';

                console.log(data);
                let topClientGraphic = [];

                data.topClients.map((order, index) => {
                    topClientGraphic[index] = {
                        ...order.client[0],
                        total: order.total
                    }
                });

                console.log(topClientGraphic);

                return (
                    <BarChart width={600} height={300} data={topClientGraphic}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend />
                        <Bar dataKey="total" fill="#10a98b" />
                    </BarChart>
                )
            }}
        </Query>
    );
}
 
export default Clients;