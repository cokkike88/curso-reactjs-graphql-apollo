import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { findClient } from '../../querys';

const ClientData = ({clientId}) => {
    let id = clientId;
    return (
        <Fragment>
            <h2>Resumen de Cliente</h2>
            <Query query={findClient} variables={{id}} pollInterval={500}>
                {({ loading, error, data, startPolling, stopPolling}) => {
                    if(loading) return 'Cargando...';
                    if(error) return `Error ${error.message}`;
                    
                    let { name, lastName, company, emails, type, age } = data.getClient;
                    
                    return(
                        <ul className="list-unstyled my-5">
                            <li className="border font-weight-bold p-2">
                                Nombre: <span className="font-weight-normal">{name}</span>
                            </li>
                            <li className="border font-weight-bold p-2">
                                Apellido: <span className="font-weight-normal">{lastName}</span>
                            </li>
                            <li className="border font-weight-bold p-2">
                                Edad: <span className="font-weight-normal">{age}</span>
                            </li>
                            <li className="border font-weight-bold p-2">Emails: 
                                <span className="font-weight-normal">{emails.map(email => ` ${email.email}`)}</span>
                            </li>
                            <li className="border font-weight-bold p-2">
                                Empresa: <span className="font-weight-normal">{company}</span>
                            </li>
                            <li className="border font-weight-bold p-2">
                                Tipo: <span className="font-weight-normal">{type}</span>
                            </li>
                        </ul>
                    )
                }}
            </Query>
        </Fragment>
    );
}

export default ClientData;