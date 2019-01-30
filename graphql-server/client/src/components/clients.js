import React, { Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { clients_query } from '../querys';
import { removeClient } from '../mutations';
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
                        {data.getClients.map(client => {

                            const {id} = client;

                            return(
                                <li key={client.id} className="list-group-item">
                                    <div className="row justify-content-between align-items-center">
                                        <div className="col-md-8 d-flex justify-content-between align-items-center">
                                            {client.name} {client.lastName} - { client.company }
                                        </div>
                                        <div className="col-md-4 d-flex justify-content-end">
                                            <Mutation mutation={removeClient}>
                                                { deleteClient => (
                                                    <button type="button" className="btn btn-danger d-block d-md-inline-block mr-2" onClick={ () => {
                                                        if(window.confirm('Seguro que desea eliminar este cliente?')){
                                                            deleteClient({
                                                                variables: {id}
                                                            })
                                                        }
                                                    }}>
                                                        &times; Eliminar
                                                    </button>
                                                )}
                                            </Mutation>
                                            <Link to={`/client/edit/${client.id}`} className="btn btn-success d-block d-md-inline-block" href="#">
                                                Editar Cliente
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </Fragment>
            )
        }}
    </Query>
)

export default Clients;