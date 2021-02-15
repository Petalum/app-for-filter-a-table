import { convertToJson } from '../mock/func/convertToJson';

const studentsTableColumns = [
    {
        "id": "№",
        "name": "Имя",
        "surname": "Фамилия",
        "patronymic": "Отчество",
        "birthday": "Дата Рождения",
        "group": "Группа",
        "faculty": "Факультет"
    }
]

const getListOfStudentsTableColumns = convertToJson(studentsTableColumns);
export default getListOfStudentsTableColumns;
