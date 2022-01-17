import React from 'react'
import { Link } from 'react-router-dom'

class StudentsForm extends React.Component {
    render() {
        return (
            <main>
                <h2>Nowy uczeń</h2>
                <form className="form">

                    <input type="hidden" name="_id" value=""/>

                    <label htmlFor="firstName">Imię: <abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" name="firstName" id="firstName" required placeholder="2-60 znaków" value=""/>
                    <span id="errorFirstName" className="errors-text"></span>

                    <label htmlFor="lastName">Nazwisko: <abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" name="lastName" id="lastName" required placeholder="2-60 znaków" value=""/>
                    <span id="errorLastName" className="errors-text"></span>

                    <label htmlFor="age">Wiek: <abbr title="required" aria-label="required">*</abbr></label>
                    <input type="number" name="age" id="age" required value=""/>
                    <span id="errorAge" className="errors-text"></span>

                    <label htmlFor="level">Poziom: </label>
                    <select name="level" id="level">
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                    </select>
                    <span className="blank-span"></span>

                    <label for="date">Data dołączenia: </label>
                    <input type="date" name="date" id="date"/>
                    <span className="errors-text"></span>

                    <input type="submit" className="form-button-submit" value="Dodaj ucznia"/>

                    <Link to="/students" className="form-button-cancel">Anuluj</Link>
                    <span className="blank-span"></span>
                </form>
            </main>
        )
    }
}

export default StudentsForm