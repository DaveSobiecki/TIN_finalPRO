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
                <option value="A1" >A1</option>
                <option value="A2" >A2</option>
                <option value="B1" >B1</option>
                <option value="B2" >B2</option>
                <option value="C1" >C1</option>
                <option value="C2" >C2</option>
            </select>
            <span id={errorSpanId} className="errors-text">{props.error}</span>
        </>
    )
}

export default FormInput