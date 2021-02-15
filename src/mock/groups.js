import { convertToJson } from '../mock/func/convertToJson'

const groups = [
    {
        "id": "1",
        "group": ["1", "2"],
        "faculty": "Дизайн и реклама",
    },
    {
        "id": "2",
        "group": ["1", "2"],
        "faculty": "Строительство и архитектура",
    },
    {
        "id": "3",
        "group": ["1", "2", "3"],
        "faculty": "Облачные вычисления",

    },
    {
        "id": "4",
        "group": ["4", "5"],
        "faculty": "Педагогика и психология",
    }
]

const getListOfGroups = convertToJson(groups);

export default getListOfGroups;