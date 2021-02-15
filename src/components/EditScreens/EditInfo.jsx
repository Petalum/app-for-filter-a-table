import ErrorMessage from '../common/Errors/ErrorMessage';
import SuccessMessage from '../common/Success/Success';

export const BasicStudentInfo = ({ surname, name, patronymic, birthday, group, faculty }) => {
    return (<>
    Фамилия: {surname}<br />
    Имя: {name}<br />
    Отчество: {patronymic}<br />
    Дата рождения: {birthday}<br />
    Номер группы: {group}<br />
    Факультет: {faculty}<br />
    </>
    )
}

export const BasicGroupInfo = ({ faculty }) => {
    return (<>
        Факультет: {faculty}<br />
    </>
    )
}

export const InfoAfterTotalDeletion = ({ successFlag, errorMessage, successInfo }) => {
    return (<div>
        <ErrorMessage message={errorMessage} />
        {successFlag && <SuccessMessage message={successInfo} />}
    </div>
    )
}