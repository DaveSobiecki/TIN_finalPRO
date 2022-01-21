import React from 'react'

function FormInput(props) {
    const className = props.err === '' ? '' : 'error-input';
    const name = props.name;
    const errorSpanId = 'error' + name[0].toUpperCase() + name.slice(1);
    return (
        <>
            <label htmlFor={props.name}>
                {props.label}:
                {props.required && <abbr title='Pole wymagane' aria-label='required'>*</abbr>}
            </label>

            <select name={props.name} id={props.name} onChange={props.onChange} className={className}>
                <option value="Poniedziałek" selected>Poniedziałek</option>
                <option value="Wtorek" >Wtorek</option>
                <option value="Środa" >Środa</option>
                <option value="Czwartek" >Czwartek</option>
                <option value="Piątek" >Piątek</option>
                <option value="Sobota" >Sobota</option>
                <option value="Niedziela" >Niedziela</option>
            </select>
            <span id={errorSpanId} className="errors-text">{props.error}</span>
        </>
    )
}

export default FormInput