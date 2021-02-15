import React from 'react';
import FilterBody from './FiltersBody';
import { chooseItemsFromArrayOfObjects, clearArrayFromIdenticalValues } from '../common/func/functions';
import PropTypes from 'prop-types';

class FiltersContainer extends React.Component {
    
    createArrayOfItemsForFilter(arr, mark) {
        const fullMarksArray = chooseItemsFromArrayOfObjects(arr, mark);
        const clearedMarksArray = clearArrayFromIdenticalValues(fullMarksArray);
        return clearedMarksArray;
    }

    render() {
        const filteredSurnames = this.createArrayOfItemsForFilter(this.props.students, 'surname');
        const filteredGroupNumbers = this.createArrayOfItemsForFilter(this.props.groups, 'group');
        const initialObject = {
            surnames: filteredSurnames,
            numbers: filteredGroupNumbers
        }

        return (
            <div>
                <FilterBody initialObject={initialObject} keyName={this.props.keyName} fullListOfStudents={this.props.students} buttonTitle={"Фильтр"} setFilteredStudentsList={this.props.setFilteredStudentsList} /><br /><br/>
            </div>
        )
    }
}

FiltersContainer.propTypes = {
    groups: PropTypes.array.isRequired,
    students: PropTypes.array.isRequired,
    setFilteredStudentsList: PropTypes.func.isRequired,
    keyName: PropTypes.string.isRequired
}

export default FiltersContainer;
