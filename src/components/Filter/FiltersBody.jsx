import React, { useState } from 'react';
import FilterForm from './FilterForm';
import PropTypes from 'prop-types';

const FiltersBody = ({ initialObject, fullListOfStudents, buttonTitle, setFilteredStudentsList, keyName }) => {

    let [openFlag, setOpenFlag] = useState(false);

    const openFilter = () => {
        setOpenFlag(true);
    }

    const closeFilter = () => {
        setOpenFlag(false);
    }

    return (<>
        {!openFlag ? <button onClick={openFilter}>{buttonTitle}</button> : <button onClick={closeFilter}>Скрыть</button>}
        {openFlag && <div><FilterForm initialObject={initialObject} fullListOfStudents={fullListOfStudents} setFilteredStudentsList={setFilteredStudentsList} keyName={keyName} /></div>}
    </>
    )
}

FiltersBody.propTypes = {
    initialObject: PropTypes.object,
    fullListOfStudents: PropTypes.array.isRequired,
    setFilteredStudentsList: PropTypes.func.isRequired,
    keyName: PropTypes.string.isRequired,
    buttonTitle: PropTypes.string.isRequired
}

export default FiltersBody;