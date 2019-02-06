import React, { Component } from 'react';


class Paginador extends Component {
    state = { 
        paginador: {
            pages: Math.ceil(Number(this.props.total / this.props.limit))
        }
     }
    render() { 
        const {actuality} = this.props;  
        const { pages } = this.state.paginador;
        const btnBefore = (actuality > 1) ? <button onClick={this.props.backPage} type="button" className="btn btn-success mr-2">&laquo; Anterior</button> : '';
        const btnNext = (actuality !== pages) ? <button onClick={this.props.nextPage} type="button" className="btn btn-success mr-2">Siguiente &raquo;</button> : '';


        return ( 
            <div className="mt-5 d-flex justify-content-center">
                {btnBefore} {btnNext}
            </div>
         );
    }
}
 
export default Paginador;