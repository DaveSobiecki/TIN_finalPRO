import React from 'react';
import formMode from '../../helpers/formHelper';
import { getTeacherByIdApiCall, updateTeacherApiCall, addTeacherApiCall } from '../../apiCalls/teachersApiCalls';
import { checkRequired, checkTextLengthRange, checkEmail, checkNumber } from '../../helpers/validation/validationCommon';
import { Redirect } from 'react-router-dom';
import FormInput from '../form/FormInput';
import FormButtons from '../form/FormButtons';
import FormInputLevels from '../form/FormInputLevels';
import {withTranslation} from 'react-i18next';

class TeachersForm extends React.Component {

    constructor(props) {
        super(props);
        
        const paramsStudId = props.match.params.teacherId;
        const currentFormMode = paramsStudId ? formMode.EDIT : formMode.NEW;

        this.state = {
            teacherId: paramsStudId,
            teacher: {
                firstName: '',
                lastName: '',
                salary: 0,
                level: '',
                mail: ''
            },
            errors: {
                firstName: '',
                lastName: '',
                salary: '',
                level: '',
                mail: ''
            },
            formMode: currentFormMode,
            redirect: false,
            err: null
        }
    }

    fetchTeachersDetails = () => {
        getTeacherByIdApiCall(this.state.teacherId)
        .then(response => response.json())
        .then(
            (data) => {
                if(data.message) {
                    this.setState({
                        teacher: null,
                        message: data.message
                    })
                } else {
                    this.setState({
                        teacher: data,
                        message: null
                    })
                }
                this.setState({
                    isLoaded:true
                })
            },
            (err) => {
                this.setState({
                    isLoaded: true,
                    err
                })
            }
        )
    }

    componentDidMount = () => {
        const currentFormMode = this.state.formMode;
        if (currentFormMode === formMode.EDIT){
            this.fetchTeachersDetails();
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        const teacher = { ...this.state.teacher };
        teacher[name] = value;

        const errorMessage = this.validateField(name, value);
        const errors = { ...this.state.errors };
        errors[name] = errorMessage;
        this.setState({
            teacher: teacher,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        const {t} = this.props;
        if (fieldName === 'firstName'){
            if(!checkRequired(fieldValue)){
                errorMessage = t('forms.fieldRequired');
            } else if (!checkTextLengthRange(fieldValue, 2, 60)){
                errorMessage = t('forms.textFieldError');
            }
        }

        if (fieldName === 'lastName'){
            if(!checkRequired(fieldValue)){
                errorMessage = t('forms.fieldRequired');
            } else if (!checkTextLengthRange(fieldValue, 2, 60)){
                errorMessage = t('forms.textFieldError');
            }
        }

        if (fieldName === 'mail'){
            if(!checkRequired(fieldValue)){
                errorMessage = t('forms.fieldRequired');
            } else if (!checkTextLengthRange(fieldValue, 5, 60)){
                errorMessage = t('forms.mailDigitsError');
            } else if (!checkEmail(fieldValue)){
                errorMessage = t('forms.mailFieldError');
            }
        }

        if (fieldName === 'level'){
            if(!checkRequired(fieldValue)){
                errorMessage = t('forms.fieldRequired');
            } else if (!checkTextLengthRange(fieldValue, 2, 2)){
                errorMessage = t('forms.levelFieldErrorTeacher');
            }
        }

        if (fieldName === 'salary'){
            if(!checkRequired(fieldValue)){
                errorMessage = t('forms.fieldRequired');
            } else if (!checkNumber(fieldValue)){
                errorMessage = t('forms.sallaryFieldError');
            }
        }

        return errorMessage;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm();
        if (isValid) {
            
            const
                teacher = this.state.teacher,
                currentFormMode = this.state.formMode;
            
            let
                promise,
                response;
            
            if (currentFormMode === formMode.NEW){
                promise = addTeacherApiCall(teacher);
            } else if (currentFormMode === formMode.EDIT) {
              console.log(teacher);
              const teacherId = this.state.teacherId;
              promise = updateTeacherApiCall(teacherId, teacher);  
            }

            if(promise) {
                promise
                    .then(
                        (data) => {
                            response = data;
                            if (response.status === 201 || response.status === 500) {
                                return data.json();
                            }
                        }
                    )
                    .then(
                        (data) => {
                            if(!response.ok && response.status === 500){
                                console.log(data);
                                for(const i in data) {
                                    const errorItem = data[i];
                                    const errorMessage = errorItem.message;
                                    const fieldName = errorItem.path;
                                    const errors = { ...this.state.errors };
                                    errors[fieldName] = errorMessage;
                                    this.setState({
                                        errors: errors,
                                        err: null
                                    })
                                }
                            } else {
                                this.setState({
                                    redirect: true
                                })
                            }
                        },
                        (err) => {
                            this.setState({
                                err
                            })
                            console.log(err);
                        }
                    )
            }
        }
    }

    validateForm = () => {
        const teacher = this.state.teacher;
        const errors = this.state.errors;

        for(const fieldName in teacher) {
            const fieldValue = teacher[fieldName];
            const errorMessage = this.validateField(fieldName, fieldValue);
            errors[fieldName] = errorMessage;
        }

        this.setState({
            errors: errors
        })

        return !this.hasErrors();
    }

    hasErrors = () => {
        const errors = this.state.errors;
        for (const errorField in this.state.errors){
            if(errors[errorField].length > 0) {
                return true;
            }
        }
        return false;
    }

    render() {

        const {redirect} = this.state;
        const {t} = this.props;

        if (redirect) {
            const currentFormMode = this.state.formMode;
            const notice = currentFormMode === formMode.NEW ? t('teachers.form.add.text') : t('teachers.form.edit.text');
            return(
                <Redirect to={{
                    pathname: "/teachers",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }

        const errorsSummary = this.hasErrors() ? t('lessons.form.errorsInForm') : '';
        const fetchError = this.state.err ? `${t('teachers.details.error')}: ${this.state.err.message}` : '';
        const pageTitle = this.state.formMode === formMode.NEW ? t('teachers.form.add.pageTitle') : t('teachers.form.edit.pageTitle');

        const globalErrorMessage = errorsSummary || fetchError || this.state.message;

        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('teachers.fields.firstName')}
                        required
                        error={this.state.errors.firstName}
                        name="firstName"
                        placeholder={t('teachers.details.digits')}
                        onChange={this.handleChange}
                        value={this.state.teacher.firstName}
                    />
                    <FormInput
                        type="text"
                        label={t('teachers.fields.lastName')}
                        required
                        error={this.state.errors.lastName}
                        name="lastName"
                        placeholder={t('teachers.details.digits')}
                        onChange={this.handleChange}
                        value={this.state.teacher.lastName}
                    />
                    <FormInput
                        type="number"
                        label={t('teachers.fields.salary')}
                        required
                        error={this.state.errors.salary}
                        name="salary"
                        placeholder=""
                        onChange={this.handleChange}
                        value={this.state.teacher.salary}
                    />
                    <FormInputLevels
                        type="text"
                        label={t('teachers.fields.level')}
                        required
                        error={this.state.errors.level}
                        name="level"
                        placeholder=""
                        onChange={this.handleChange}
                        value={this.state.teacher.level}
                    />
                    <FormInput
                        type="email"
                        label={t('teachers.fields.mail')}
                        error={this.state.errors.mail}
                        required
                        name="mail"
                        placeholder={t('teachers.details.digitsMail')}
                        onChange={this.handleChange}
                        value={this.state.teacher.mail}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/teachers"
                    />
                </form>
            </main>
        )
    }
}

export default withTranslation() (TeachersForm)