import React from 'react';

const Error = ({strMessage}) => {
    console.log('MESSAGE', strMessage);
    return ( <p className="alert alert-danger py-3 text-center my-3">{strMessage}</p>)
}

export default Error;