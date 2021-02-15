import { convertToJson } from './func/convertToJson';

const studentsTableColumns = [
    {
        "id": "№",
        "group": "Номер группы",
        "faculty": "Факультет"
    }
]

const getListOfGroupTableColumns = convertToJson(studentsTableColumns);
export default getListOfGroupTableColumns;
