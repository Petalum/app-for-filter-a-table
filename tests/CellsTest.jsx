import React from 'react';

const CellsTest = (props) => {
    return <>
        <ul className="listOfNames">
            {props.cellsNames[0].text}
        </ul>
    </>
}
export default CellsTest;