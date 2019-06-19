import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { createUser } from '../../mutations';
import Error from '../alerts/error';
import { withRouter, Redirect } from 'react-router-dom';

const initialState = {
    user: '',
    name: '',
    pass: '',
    repeatPassword: '',
    role: ''
}

class Register extends Component {
    
    state = { 
        ...initialState
     }

    createRegister = (e, addUser) => {
        e.preventDefault();
        addUser().then(data => {
            console.log(data);
            this.cleanState();
            this.props.history.push('/login');
        })
    }

    updateState = e => {
        let {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    validateForm = () => {
        let { user, name, pass, repeatPassword, role } = this.state;
        let noValidate = !user || !name || !pass || pass !== repeatPassword || !role;
        return noValidate;
    }

    cleanState = () => {
        this.setState({...initialState})
    }

    render() { 

        let { user, name, pass, repeatPassword, role } = this.state;

        let userRole = this.props.session.getUser.role;
        let redirect = userRole !== 'Admin'? <Redirect to="/clients" />: '';


        return ( 
            <Fragment>
                {redirect}
                <h1 className="text-center mb-5">Nuevo Usuario</h1>
                <div className="row  justify-content-center">

                    <Mutation
                        mutation={createUser}
                        variables={{user, name, pass, role}}>

                        {(addUser, {loading, error, data}) => {
                            return(

                                <form 
                                    className="col-md-8"
                                    onSubmit={e => this.createRegister(e, addUser)}
                                >
                                        {error && <Error strMessage={error.message} />}

                                        <div className="form-group">
                                            <label>Usuario</label>
                                            <input 
                                                onChange={this.updateState}
                                                type="text" 
                                                name="user" 
                                                className="form-control" 
                                                placeholder="Usuario" 
                                                value={user}
                                            />
                                            <small className="form-text text-muted">
                                                (Sin espcacios y sin caracteres)
                                            </small>
                                        </div>
                                        <div className="form-group">
                                            <label>Nombre</label>
                                            <input 
                                                onChange={this.updateState}
                                                type="text" 
                                                name="name" 
                                                className="form-control" 
                                                placeholder="Nombre" 
                                                value={name}
                                            />
                                            <small className="form-text text-muted">
                                                (Agrega el nombre completo)
                                            </small>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label>Password</label>
                                                <input 
                                                    onChange={this.updateState}
                                                    type="password" 
                                                    name="pass" 
                                                    className="form-control" 
                                                    placeholder="Password"
                                                    value={pass}
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Repetir Password</label>
                                                <input 
                                                    onChange={this.updateState}
                                                    type="password" 
                                                    name="repeatPassword" 
                                                    className="form-control" 
                                                    placeholder="Repetir Password" 
                                                    value={repeatPassword}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                        </div>
                                            <label>Rol</label>
                                            <select
                                                className="form-control"
                                                value={role}
                                                name="role"
                                                onChange={this.updateState}
                                            >
                                                <option value="">Elegir...</option>
                                                <option value="Admin">Administrador...</option>
                                                <option value="Seller">Vendedor...</option>
                                            </select>
                                        <button 
                                            disabled = {loading || this.validateForm() }
                                            type="submit" 
                                            className="btn btn-success float-right">
                                                Crear Usuario
                                        </button>
                                </form>
                            )
                        }}

                    </Mutation>

                </div>
            </Fragment>
         );
    }
}
 
export default withRouter(Register);