import { Field } from 'formik';

export const InputControl = ({ mark, validator, errors, touched, labelName }) => {
    return <>
        <label htmlFor={mark}>{labelName}</label><br />
        <Field id={mark} name={mark} validate={validator} /><br />
        {validator && errors[mark] && touched[mark] ? <div>{errors[mark]}</div> : null}
    </>
}

export const RadioControl = ({ labelName, radioGroupName, clickFunc }) => {
    return <>
        <label>
            <Field type="radio" name={radioGroupName} value={labelName} onClick={clickFunc} />
            <span>{labelName}</span>
        </label>
    </>
}

export const CheckboxControl = ({ labelName, checkboxGroupName }) => {
    return <>
        <label>
            <Field type="checkbox" name={checkboxGroupName} value={labelName} />
            <span>{labelName}</span>
        </label>
    </>
}


