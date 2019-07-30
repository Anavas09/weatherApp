import React from 'react';
import PropTypes from 'prop-types';

function Error({mensaje}){
    return(
        <div className="card-panel red darken-4 error col s12">
            {mensaje}
        </div>
    )
}

Error.propTypes = {
    mensaje: PropTypes.string.isRequired,
};

export default Error;