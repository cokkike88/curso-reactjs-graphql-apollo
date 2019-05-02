import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { createUser } from '../../mutations';
import Error from '../alerts/error';
import { withRouter } from 'react-router-dom';

const initialState = {
    user: '',
    pass: '',
    repeatPassword: ''
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
        let { user, pass, repeatPassword } = this.state;
        let noValidate = !user || !pass || pass !== repeatPassword;
        return noValidate;
    }

    cleanState = () => {
        this.setState({...initialState})
    }

    render() { 

        let { user, pass, repeatPassword } = this.state;

        return ( 
            <Fragment>
                <h1 className="text-center mb-5">Nuevo Usuario</h1>
                <div className="row  justify-content-center">

                    <Mutation
                        mutation={createUser}
                        variables={{user, pass}}>

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
                                                placeholder="Nombre Usuario" 
                                                value={user}
                                            />
                                        </div>
                                        <div className="form-group">
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
                                        <div className="form-group">
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