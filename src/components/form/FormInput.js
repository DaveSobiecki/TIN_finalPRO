import React from 'react';
import { useTranslation } from 'react-i18next';

function FormInput(props) {
    const {t} = useTranslation();
    const className = props.error === '' ? '' : 'error-input';
    const name = props.name;
    const errorSpanId = 'error' + name[0].toUpperCase() + name.slice(1);
    return (
        <>
            <label htmlFor={props.name}>
                {props.label}:
                {props.required && <abbr title={t('forms.fieldRequired')} aria-label='required'>*</abbr>}
            </label>
            <input 
                type={props.type}
                className={className}
                name={props.name}
                id={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange} />
            <span id={errorSpanId} className="errors-text">{props.error}</span>
        </>
    )
}

export default FormInput