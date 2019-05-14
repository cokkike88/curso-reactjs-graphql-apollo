import React from 'react';
import { Query } from 'react-apollo';
import { CurrentUser } from '../querys';

const Session = Component => props => (
    <Query query={CurrentUser}>
        {({loading, error, data, refetch}) => {
            if(loading) return null;
            return <Component {...props} refetch={refetch} session={data} />
        }}
    </Query>
)
 
export default Session;