import React from 'react';
import PropTypes from 'prop-types';

const SuccessMessage = ({ message }) => {
  return <>
    <div className="successMessage">
      {message}
    </div>
  </>
}

SuccessMessage.propTypes = {
  message: PropTypes.string
}

export default SuccessMessage;