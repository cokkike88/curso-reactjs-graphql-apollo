import React, { Component, Fragment } from 'react';
// Mutations
import { createClient } from '../../mutations';
import { Mutation } from 'react-apollo';
import { createFragmentMap } from 'apollo-utilities';

class NewClient extends Component{
    state = {
        client : {
            name: '',
            lastName: '',
            company: '',
            age: '',
            emails: [],
            type: ''
        },
        error: false,
        emails: []
    };

    emailChange = (i) => (e) => {
        const newEmails = this.state.emails.map((email, index) => {
            if(i !== index) return email;
            return {
                ...email,
                email: e.target.value
            }
        });
        this.setState({
            emails: newEmails
        })

    }

    newField = () => {
        this.setState({
            emails: this.state.emails.concat([{email: ''}])
        })
        console.log('Hiciste click en el boton de email');
    }

    takeOutField = (i) => () => {

        this.setState({
            emails: this.state.emails.filter((email, index) => i !== index)
        })

        console.log('Eliminar' , i);
    }

    render(){

        const { error } = this.state;
        let response = (error) ? <p className="alert alert-danger p-3 text-center">Todos los campos son obligatorios</p>: '';


        return (
            <Fragment>
                <h2 className="text-center">NUEVO CLIENTE</h2>
                { response }
                <div className="row justify-content-center">
                    <Mutation mutation = { createClient } onCompleted={ () => this.props.history.push('/client')}>
                        {
                            addClient => (
                                <form className="col-md-8 m-3" onSubmit = { e => {
                                        e.preventDefault();
                                        const { name, lastName, company, age, type } = this.state.client;

                                        if(name === '' || lastName === '' || company === '' || age === '' || type === ''){
                                            this.setState({
                                                error: true
                                            });
                                            return ;
                                        }

                                        const {emails} = this.state;

                                        this.setState({
                                            error: false
                                        });

                                        const input = {
                                            name,
                                            lastName,
                                            company,
                                            age: Number(age),
                                            type,
                                            emails
                                        };
                                        // call mutation
                                        addClient({
                                            variables: {input}
                                        })
                                    }
                                }>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>Nombre</label>
                                            <input type="text" className="form-control" placeholder="Nombre"
                                                onChange = { e => {
                                                    this.setState({
                                                        client: {
                                                            ...this.state.client,
                                                            name: e.target.value
                                                        }                                            
                                                    })
                                                }}
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Apellido</label>
                                            <input type="text" className="form-control" placeholder="Apellido"
                                                onChange = { e => {
                                                    this.setState({
                                                        client: {
                                                            ...this.state.client,
                                                            lastName: e.target.value
                                                        }
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label>Empresa</label>
                                            <input type="text" className="form-control" placeholder="Empresa"
                                                onChange = { e => {
                                                    this.setState({
                                                        client: {
                                                            ...this.state.client,
                                                            company: e.target.value
                                                        }
                                                    })
                                                }}
                                            />
                                        </div>
                                        {this.state.emails.map((input, index) => (
                                            <div key={index} className="form-group col-md-12">
                                                <label>Correo {index + 1}:</label>
                                                <div className="input-group">
                                                    <input type="email" placeholder="Email" className="form-control" onChange={this.emailChange(index)} />
                                                    <div className="input-group-append">
                                                        <button type="button" className="btn btn-danger" onClick={this.takeOutField(index)}>
                                                            &times; Eliminar
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>
                                        ))}
                                        <div className="form-group d-flex justify-content-center col-md-12">
                                            <button type="button" className="btn btn-warning" onClick={this.newField}>+ Agregar Email</button>
                                        </div>                                        
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>Edad</label>
                                            <input type="text" className="form-control" placeholder="Edad"
                                                onChange = { e => {
                                                    this.setState({
                                                        client: {
                                                            ...this.state.client,
                                                            age: e.target.value
                                                        }
                                                    })
                                                }}
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Tipo Cliente</label>  
                                            <select className="form-control"
                                                onChange = { e => {                                        
                                                    this.setState({
                                                        client: {
                                                            ...this.state.client,
                                                            type: e.target.value
                                                        }
                                                    })
                                                }}
                                            >
                                                <option value="">Elegir...</option>
                                                <option value="PREMIUM">PREMIUM</option>
                                                <option value="BASIC">BÁSICO</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-success float-right">Agregar Cliente</button>
                                </form>                                
                            )
                        }
                    </Mutation>
                </div>
            </Fragment>

        )
    }
}

export default NewClient;