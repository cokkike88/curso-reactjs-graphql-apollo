import React, { Fragment, Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { clients_query } from '../../querys';
import { removeClient } from '../../mutations';
import { Link } from 'react-router-dom';
import Paginador from '../paginador';

class Clients extends Component {

    limit = 5;

    state = {
        paginador: {
            offset: 0,
            actuality: 1
        }
    }

    nextPage = () => {
        this.setState({
            paginador:{
                offset: this.state.paginador.offset + this.limit,
                actuality: this.state.paginador.actuality + 1
            }
        })
    }

    backPage = () => {
        this.setState({
            paginador: {
                offset: this.state.paginador.offset - this.limit,
                actuality: this.state.paginador.actuality - 1
            }
        })
    }

    render(){
        return (

            <Query query={clients_query} pollInterval={1000} variables={{limit: this.limit, offset: this.state.paginador.offset}}>
                {({ loading, error, data, startPolling, stopPolling }) => {
                    if(loading) return "Cargando...";
                    if (error) return `Error: ${error.message}`;
                    console.log(data);
        
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
                            <Paginador actuality={this.state.paginador.actuality} total={data.totalClients} limit={this.limit}
                                nextPage={this.nextPage} backPage={this.backPage}/>
                        </Fragment>
                    )
                }}
            </Query>
        )
    }
}




export default Clients;