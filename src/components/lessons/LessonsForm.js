import React from 'react'
import { Link } from 'react-router-dom'

class LessonsForm extends React.Component {
    render() {
        return (
            <main>
                <h2>Nowy uczeń</h2>
                <form className="form">

                    <input type="hidden" name="_id" value=""/>

                    <label htmlFor="name">Nazwa: <abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" name="firstName" id="firstName" required placeholder="2-60 znaków" value=""/>
                    <span id="errorFirstName" className="errors-text"></span>

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

                    <label for="timeStart">Początek zajęć: <span className="symbol-required">*</span></label>
                    <input type="time" name="startHour" id="startHour" required/>
                    <span id="errorTimeStart" className="errors-text"></span>

                    <label for="timeEnd">Koniec zajęć: <span className="symbol-required">*</span></label>
                    <input type="time" name="endHour" id="endHour" required/>
                    <span id="errorTimeEnd" className="errors-text"></span>

                    <label for="day">Dni prowadzenia zajęć: </label>
                    <select name="day" id="day">
                        <option value="Poniedziałek">Poniedziałek</option>
                        <option value="Wtorek">Wtorek</option>
                        <option value="Środa">Środa</option>
                        <option value="Czwartek">Czwartek</option>
                        <option value="Piątek">Piątek</option>
                        <option value="Sobota">Sobota</option>
                        <option value="Niedziela">Niedziela</option>
                    </select>
                    <span class="blank-span"></span>

                    <input type="submit" className="form-button-submit" value="Dodaj ucznia"/>

                    <Link to="/students" className="form-button-cancel">Anuluj</Link>
                    <span className="blank-span"></span>
                </form>
            </main>
        )
    }
}

export default LessonsForm