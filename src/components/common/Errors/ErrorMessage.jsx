import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ message }) => {
  return <>
    <div className="errorMes">
      {message}
    </div>
  </>
}

ErrorMessage.propTypes = {
  message: PropTypes.string
}

export default ErrorMessage;