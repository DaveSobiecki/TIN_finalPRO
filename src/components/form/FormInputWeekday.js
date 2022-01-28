import React from 'react'
import { useTranslation } from 'react-i18next';

function FormInput(props) {
    const {t} = useTranslation();
    const className = props.err === '' ? '' : 'error-input';
    const name = props.name;
    const errorSpanId = 'error' + name[0].toUpperCase() + name.slice(1);
    return (
        <>
            <label htmlFor={props.name}>
                {props.label}:
                {props.required && <abbr title={t('forms.fieldRequired')} aria-label='required'>*</abbr>}
            </label>

            <select name={props.name} id={props.name} onChange={props.onChange} className={className}>
                <option value="Poniedziałek" selected>{t('weekdays.monday')}</option>
                <option value="Wtorek" >{t('weekdays.tuesday')}</option>
                <option value="Środa" >{t('weekdays.wednesday')}</option>
                <option value="Czwartek" >{t('weekdays.thursday')}</option>
                <option value="Piątek" >{t('weekdays.friday')}</option>
                <option value="Sobota" >{t('weekdays.saturday')}</option>
                <option value="Niedziela" >{t('weekdays.sunday')}</option>
            </select>
            <span id={errorSpanId} className="errors-text">{props.error}</span>
        </>
    )
}

export default FormInput