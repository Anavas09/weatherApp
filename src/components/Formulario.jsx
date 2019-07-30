import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Formulario({consultaDatos}) {

    //state del component
    //busqueda = state, guardarBusqueda = this.setState({})
    const [busqueda, guardarBusqueda] = useState({
        ciudad: '',
        pais: ''
    })

    const handleOnChange = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }

    const handleOnSubmit = e => {
        e.preventDefault();

        //Pasar al compontente principal
        consultaDatos(busqueda)
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <div className="input-field col s12">
                <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    onChange={handleOnChange}
                />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>

            <div className="input-field col s12">
                <select name="pais" onChange={handleOnChange}>
                    <option value="">Selecciona un país</option>
                    <option value="CO">Colombia</option>
                    <option value="AR">Argentina</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">Mexico</option>
                    <option value="VE">Venezuela</option>
                </select>
            </div>

            <div className="input-field col s12">
                <input type="submit" className="waves-effect waves-light btn-large btn-block yellow accent-4" value="Buscar Clima"/>
            </div>
        </form>
    );
}

Formulario.propTypes = {
    consultaDatos: PropTypes.func.isRequired,
}

export default Formulario;