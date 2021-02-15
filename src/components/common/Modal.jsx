import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ModalInfo = ({ buttonName, modalTitle, modalBody, successFlag, changeSuccessFlag }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeFlag = () => {
    changeSuccessFlag(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{modalTitle}</h2>
      <p id="simple-modal-description">
        {modalBody}
        <button onClick={handleClose}>Отмена</button>
      </p>

    </div>
  );

  return (
    <div onClick={successFlag ? changeFlag : null}>
      <button type="button" onClick={handleOpen}>
        {buttonName}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

ModalInfo.propTypes = {
  buttonName: PropTypes.any,
  modalTitle: PropTypes.any,
  modalBody: PropTypes.any,
  successFlag: PropTypes.bool,
  changeSuccessFlag: PropTypes.func
}

export default ModalInfo;