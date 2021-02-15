import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import PropTypes from 'prop-types';

const Table = ({ cellsInfo, cellsNames }) => {
    return (<>
        {cellsNames.length && cellsInfo && <BootstrapTable keyField='id' data={cellsInfo} columns={cellsNames} />}
    </>
    )
}

Table.propTypes = {
    cellsInfo: PropTypes.array.isRequired,
    cellsNames: PropTypes.array.isRequired
}

export default Table;

