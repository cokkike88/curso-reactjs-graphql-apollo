import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { clients_query } from '../querys';
import { Link } from 'react-router-dom';

const Clients = () => (
    <Query query={clients_query} pollInterval={1000} >
        {({ loading, error, data, startPolling, stopPolling }) => {
            if(loading) return "Cargando...";
            if (error) return `Error: ${error.message}`;
            console.log(data.getClients);

            return (
                <Fragment>
                    <h2 className="text-center">Listado de clientes</h2>
                    <ul className="list-group mt-4">
                        {data.getClients.map(client => (
                            <li key={client.id} className="list-group-item">
                                <div className="row justify-content-between align-items-center">
                                    <div className="col-md-8 d-flex justify-content-between align-items-center">
                                        {client.name} {client.lastName} - { client.company }
                                    </div>
                                    <div className="col-md-4 d-flex justify-content-end">
                                        <Link to={`/client/edit/${client.id}`} className="btn btn-success d-block d-md-inline-block" href="#">
                                            Editar Cliente
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Fragment>
            )
        }}
    </Query>
)

export default Clients;