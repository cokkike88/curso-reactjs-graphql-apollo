import React, { Component, Fragment } from 'react';
import { findClient } from '../../querys';
import { Query } from 'react-apollo';
import EditClientForm from './editClientForm';
import { editClient } from '../../mutations';

class EditClient extends Component {
    state = { };
    render(){

        const { id } = this.props.match.params;
        // console.log(id);
        return (
            <Fragment>
                <h2 className="text-center">EDITAR CLIENTE</h2>

                <div className="row justify-content-center">
                    <Query query={findClient} variables={{id}} refetchQueries={editClient}>
                        {({ loading, error, data, refetch}) => {
                            if(loading) return 'Cargando...';
                            if(error) return `Error! ${error.message}`;
                            
                            console.log(data);

                            return (
                                <EditClientForm  client={data.getClient} refetch={refetch}/>
                            )

                        }}
                    </Query>
                </div>


            </Fragment>
        )
    }
}

export default EditClient;