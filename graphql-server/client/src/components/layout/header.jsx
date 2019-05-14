import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import CloseSession from '../layout/CloseSession';

const Header = ({session}) => {

    let navegation = (session.getUser) ? <NavAuth /> : <NavNoAuth />;
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-4">
            <div className="container">
                {navegation}
            </div>
        </nav>
    )
};

const NavNoAuth = () => (
    <h3 to="/" className="navbar-brand text-light font-weight-bold">CRM</h3>
)

const NavAuth = () => (
    <Fragment>

        <Link to="/" className="navbar-brand text-light font-weight-bold">CRM</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navegacion" aria-controls="navegacion" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navegacion">
            <ul className="navbar-nav ml-auto text-right">
                <li className="nav-item dropdown mr-md-2 mb-2 mb-md-0">
                    <button
                        className="nav-link dropdown-toggle btn btn-block btn-success"
                        data-toggle="dropdown"
                    >Clientes</button>
                    <div className="dropdown-menu" arial-labelledby="navegacion">
                        <Link to="/client" className="dropdown-item">Ver clientes</Link>
                        <Link to="/client/new" className="dropdown-item">Nuevo cliente</Link>
                    </div>
                </li>   
                <li className="nav-item dropdown">
                    <button
                        className="nav-link dropdown-toggle btn btn-block btn-success"
                        data-toggle="dropdown"
                    >Productos</button>
                    <div className="dropdown-menu" arial-labelledby="navegacion">
                        <Link to="/product" className="dropdown-item">Ver productos</Link>
                        <Link to="/product/new" className="dropdown-item">Nuevo producto</Link>
                    </div>
                </li>  
                <CloseSession />               
            </ul>
        </div> 
    </Fragment>
);

export default Header;