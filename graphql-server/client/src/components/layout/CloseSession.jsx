import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const closeSessionUser = (client, history) => {
    localStorage.removeItem('token', '');
    client.resetStore();
    history.push('/login');
}

const CloseSession = ({history}) => (

    <ApolloConsumer>
        {client => {
            return (
                <button 
                    onClick={() => closeSessionUser(client, history)}
                    className="btn btn-light ml-md-2 mt-2 mt-md-0">
                    Cerrar session
                </button>

            )
        }}
    </ApolloConsumer>
);
 
export default withRouter(CloseSession);