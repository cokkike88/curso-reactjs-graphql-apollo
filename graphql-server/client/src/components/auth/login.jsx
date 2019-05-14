import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Error from '../alerts/error';
import { Mutation } from 'react-apollo';
import { login } from '../../mutations';

const initialState = {
    user : '',
    pass: ''
}

class Login extends Component {
    state = {
        ...initialState
    }

     updateState = e => {
         const { name, value} = e.target;

        this.setState({
            [name] : value
        })
     }


    cleanState = () => {
         this.setState({...initialState});
    }

    initialState = (e, login) => {
        e.preventDefault();
        
        login().then(async ({data}) => {
            // console.log(data.authUser.token);
            localStorage.setItem('token', data.authUser.token);
            await this.props.refetch();

            this.cleanState();

            setTimeout(() => {
                this.props.history.push('/panel');
            }, 3000);
        })
     
     }

     validarForm = () => {
        const {user, pass} = this.state;

        const noValido = !user || !pass;

        console.log(noValido);
        return noValido;
     }
    render() { 

        const {user, pass} = this.state;
      
        return ( 
            <Fragment>
                 <h1 className="text-center mb-5">Iniciar Sesión</h1>
                <div className="row  justify-content-center">

                    <Mutation 
                        mutation={ login }
                        variables={{user, pass}}    
                    >
                    {( login, {loading, error, data}) => {

                        return (
                            
                            <form 
                                onSubmit={ e => this.initialState(e, login) } 
                                className="col-md-8"
                            >

                            {error && <Error strMessage={error} />}
                            

                            <div className="form-group">
                                <label>Usuario</label>
                                <input 
                                    onChange={this.updateState} 
                                    value={user}
                                    type="text" 
                                    name="user" 
                                    className="form-control" 
                                    placeholder="Nombre Usuario" 
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input 
                                    onChange={this.updateState} 
                                    value={pass}
                                    type="password" 
                                    name="pass" 
                                    className="form-control" 
                                    placeholder="Password"
                                />
                            </div>

                            <button 
                                disabled={ 
                                    loading || this.validarForm()
                                }
                                type="submit" 
                                className="btn btn-success float-right">
                                    Iniciar Sesión
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
 
export default withRouter(Login);