import React from 'react';

const Success = ({strMessage}) => {
    console.log('MESSAGE', strMessage);
    return ( <p className="alert alert-success py-3 text-center my-3">{strMessage}</p>)
}

export default Success;