import React from 'react';
import { Link } from 'react-router-dom';
import formMode from '../../helpers/formHelper';
import { useTranslation } from 'react-i18next';

function FormButtons(props) {
    const {t} = useTranslation();
    let submitButtonLabel = props.submitButtonLabel;
    if (!submitButtonLabel){
        submitButtonLabel = props.formMode === formMode.NEW ? t('forms.add') : t('teachers.form.edit.btnLabel');
    }
    return (
        <div className="form-buttons">
            <p id="errorsSummary" className="errors-text">{props.error}</p>
            <input className="form-button-submit" type="submit" value={submitButtonLabel} />
            <Link to={props.cancelPath} className="form-button-cancel">{t('teachers.form.cancel')}</Link>
        </div>
    )
}

export default FormButtons