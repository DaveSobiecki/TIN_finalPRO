import React from 'react'
import formMode from '../../helpers/formHelper'
import { getStudentByIdApiCall, updateStudentApiCall, addStudentApiCall } from '../../apiCalls/studentsApiCalls'
import { checkRequired, checkTextLengthRange, checkEmail, checkNumber } from '../../helpers/validation/validationCommon'
import { Redirect } from 'react-router-dom'
import FormInput from '../form/FormInput'
import FormButtons from '../form/FormButtons'
import getFormattedDate from '../../helpers/dateHelper'
import FormInputLevels from '../form/FormInputLevels'
import {withTranslation} from 'react-i18next';

class StudentsForm extends React.Component {

    constructor(props) {
        super(props);
        
        const paramsStudId = props.match.params.studId;
        const currentFormMode = paramsStudId ? formMode.EDIT : formMode.NEW;

        this.state = {
            studId: paramsStudId,
            student: {
                firstName: '',
                lastName: '',
                age: 0,
                level: '',
                date: ''
            },
            errors: {
                firstName: '',
                lastName: '',
                age: '',
                level: '',
                date: ''
            },
            formMode: currentFormMode,
            redirect: false,
            err: null
        }
    }

    fetchStudentsDetails = () => {
        getStudentByIdApiCall(this.state.studId)
        .then(response => response.json())
        .then(
            (data) => {
                if(data.message) {
                    this.setState({
                        student: null,
                        message: data.message
                    })
                } else {
                    data.date = getFormattedDate(data.date);
                    this.setState({
                        student: data,
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
            this.fetchStudentsDetails();
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        const stud = { ...this.state.student };
        stud[name] = value;

        const errorMessage = this.validateField(name, value);
        const errors = { ...this.state.errors };
        errors[name] = errorMessage;
        this.setState({
            student: stud,
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
                errorMessage = t('forms.fieldRequired');
            }
        }

        if (fieldName === 'age'){
            if(!checkRequired(fieldValue)){
                errorMessage = t('forms.fieldRequired');
            } else if (!checkNumber(fieldValue)){
                errorMessage = t('forms.ageFieldError');
            }
        }

        if (fieldName === 'level'){
            if(!checkRequired(fieldValue)){
                errorMessage = t('forms.fieldRequired');
            } else if (!checkTextLengthRange(fieldValue, 2, 2)){
                errorMessage = t('forms.levelFieldErrorStud');
            }
        }

        if (fieldName === 'date'){
            if(!checkRequired(fieldValue)){
                errorMessage = t('forms.fieldRequired');
            }
        }

        return errorMessage;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm();
        if (isValid) {
            
            const
                student = this.state.student,
                currentFormMode = this.state.formMode;
            
            let
                promise,
                response;
            
            if (currentFormMode === formMode.NEW){
                promise = addStudentApiCall(student);
            } else if (currentFormMode === formMode.EDIT) {
              console.log(student);
              const studId = this.state.studId;
              promise = updateStudentApiCall(studId, student);  
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
        const student = this.state.student;
        const errors = this.state.errors;

        for(const fieldName in student) {
            const fieldValue = student[fieldName];
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
            const notice = currentFormMode === formMode.NEW ? t('students.form.add.text') : t('students.form.edit.text');
            return(
                <Redirect to={{
                    pathname: "/students",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }

        const errorsSummary = this.hasErrors() ? t('lessons.form.errorsInForm') : '';
        const fetchError = this.state.err ? `${t('students.details.error')}: ${this.state.err.message}` : '';
        const pageTitle = this.state.formMode === formMode.NEW ? t('students.form.add.pageTitle') : t('student.form.edit.pageTitle');

        const globalErrorMessage = errorsSummary || fetchError || this.state.message;

        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('students.fields.firstName')}
                        required
                        error={this.state.errors.firstName}
                        name="firstName"
                        placeholder={t('students.details.digits')}
                        onChange={this.handleChange}
                        value={this.state.student.firstName}
                    />
                    <FormInput
                        type="text"
                        label={t('students.fields.lastName')}
                        required
                        error={this.state.errors.lastName}
                        name="lastName"
                        placeholder={t('students.details.digits')}
                        onChange={this.handleChange}
                        value={this.state.student.lastName}
                    />
                    <FormInput
                        type="number"
                        label={t('students.fields.age')}
                        required
                        error={this.state.errors.age}
                        name="age"
                        placeholder=""
                        onChange={this.handleChange}
                        value={this.state.student.age}
                    />
                    <FormInputLevels
                        type="text"
                        label={t('students.fields.level')}
                        required
                        error={this.state.errors.level}
                        name="level"
                        placeholder=""
                        onChange={this.handleChange}
                        value={this.state.student.level}
                    />
                    <FormInput
                        type="date"
                        label={t('students.fields.date')}
                        error={this.state.errors.date}
                        name="date"
                        placeholder=""
                        onChange={this.handleChange}
                        value={this.state.student.date}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/students"
                    />
                </form>
            </main>
        )
    }
}

export default withTranslation() (StudentsForm)