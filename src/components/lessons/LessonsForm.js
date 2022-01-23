import React from 'react'
import formMode from '../../helpers/formHelper'
import { getLessonByIdApiCall, updateLessonApiCall, addLessonApiCall } from '../../apiCalls/lessonsApiCalls'
import { checkRequired, checkTextLengthRange, checkTime, checkNumber } from '../../helpers/validation/validationCommon'
import { Redirect } from 'react-router-dom'
import FormInput from '../form/FormInput'
import FormButtons from '../form/FormButtons'
import FormInputLevels from '../form/FormInputLevels'
import FormInputWeekday from '../form/FormInputWeekday'
import {withTranslation} from 'react-i18next';

class LessonsForm extends React.Component {

    constructor(props) {
        super(props);
        
        const paramsStudId = props.match.params.lessonId;
        const currentFormMode = paramsStudId ? formMode.EDIT : formMode.NEW;

        this.state = {
            lessonId: paramsStudId,
            lesson: {
                name: '',
                startHour: '',
                endHour: '',
                level: '',
                day: '',
                student_id: '',
                teacher_id: ''
            },
            errors: {
                name: '',
                startHour: '',
                endHour: '',
                level: '',
                day: '',
                student_id: '',
                teacher_id: ''
            },
            formMode: currentFormMode,
            redirect: false,
            err: null
        }
    }

    fetchLessonsDetails = () => {
        getLessonByIdApiCall(this.state.lessonId)
        .then(response => response.json())
        .then(
            (data) => {
                if(data.message) {
                    this.setState({
                        lesson: null,
                        message: data.message
                    })
                } else {
                    this.setState({
                        lesson: data,
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
            this.fetchLessonsDetails();
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        const lesson = { ...this.state.lesson };
        lesson[name] = value;

        const errorMessage = this.validateField(name, value);
        const errors = { ...this.state.errors };
        errors[name] = errorMessage;
        this.setState({
            lesson: lesson,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';

        if (fieldName === 'name'){
            if(!checkRequired(fieldValue)){
                errorMessage = 'Pole wymagane';
            } else if (!checkTextLengthRange(fieldValue, 2, 60)){
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków';
            }
        }
        
        if (fieldName === 'level'){
            if(!checkRequired(fieldValue)){
                errorMessage = 'Pole wymagane';
            } else if (!checkTextLengthRange(fieldValue, 2, 2)){
                errorMessage = 'Pole powinno zawierać 2 znaki opisujące poziom ucznia';
            }
        }

        if (fieldName === 'startHour'){
            if(!checkRequired(fieldValue)){
                errorMessage = 'Pole wymagane';
            } else if (!checkTime(fieldValue)){
                errorMessage = 'Pole powinno zawierać godzinę rozpoczęcia zajęć';
            }
        }

        if (fieldName === 'endHour'){
            if(!checkRequired(fieldValue)){
                errorMessage = 'Pole wymagane';
            } else if (!checkTime(fieldValue)){
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków';
            }
        }

        if (fieldName === 'day'){
            if(!checkRequired(fieldValue)){
                errorMessage = 'Pole wymagane';
            }
        }

        if (fieldName === 'student_id'){
            if(!checkRequired(fieldValue)){
                errorMessage = 'Pole wymagane';
            } else if (!checkNumber(fieldValue)){
                errorMessage = 'Pole powinno zawierać id ucznia';
            }
        }


        if (fieldName === 'teacher_id'){
            if(!checkRequired(fieldValue)){
                errorMessage = 'Pole powinno zawierać id nauczyciela';
            }
        }
        
        return errorMessage;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm();
        if (isValid) {
            
            const
                lesson = this.state.lesson,
                currentFormMode = this.state.formMode;
            
            let
                promise,
                response;
            
            if (currentFormMode === formMode.NEW){
                promise = addLessonApiCall(lesson);
            } else if (currentFormMode === formMode.EDIT) {
              console.log(lesson);
              const lessonId = this.state.lessonId;
              promise = updateLessonApiCall(lessonId, lesson);  
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
        const lesson = this.state.lesson;
        const errors = this.state.errors;

        for(const fieldName in lesson) {
            const fieldValue = lesson[fieldName];
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
            const notice = currentFormMode === formMode.NEW ? t('lessons.for.add.text') : t('lessons.for.edit.text');
            return(
                <Redirect to={{
                    pathname: "/lessons",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }

        const errorsSummary = this.hasErrors() ? t('lessons.form.errorsInForm') : '';
        const fetchError = this.state.err ? t('lessons.details.error') + ':' + ' ${this.state.err.message}' : '';
        const pageTitle = this.state.formMode === formMode.NEW ? t('lessons.form.add.pageTitle') : t('lessons.form.edit.pageTitle');

        const globalErrorMessage = errorsSummary || fetchError || this.state.message;
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('lessons.fields.name')}
                        required
                        error={this.state.errors.firstName}
                        name="name"
                        placeholder="2-60 znaków"
                        onChange={this.handleChange}
                        value={this.state.lesson.name}
                    />
                    <FormInputLevels
                        type="text"
                        label={t('lessons.fields.level')}
                        required
                        error={this.state.errors.level}
                        name="level"
                        placeholder=""
                        onChange={this.handleChange}
                        value={this.state.lesson.level}
                    />
                    <FormInput
                        type="time"
                        label={t('lessons.fields.startHour')}
                        required
                        error={this.state.errors.startHour}
                        name="startHour"
                        placeholder=""
                        onChange={this.handleChange}
                        value={this.state.lesson.startHour}
                    />
                    <FormInput
                        type="time"
                        label={t('lessons.fields.endHour')}
                        required
                        error={this.state.errors.endHour}
                        name="endHour"
                        placeholder=""
                        onChange={this.handleChange}
                        value={this.state.lesson.endHour}
                    />
                    <FormInputWeekday
                        type="text"
                        label={t('lessons.fields.day')}
                        error={this.state.errors.day}
                        name="day"
                        placeholder=""
                        onChange={this.handleChange}
                        value={this.state.lesson.day}
                    />
                    <FormInput
                        type="number"
                        label={t('lessons.fields.studentId')}
                        required
                        error={this.state.errors.endHour}
                        name="student_id"
                        placeholder=""
                        onChange={this.handleChange}
                        value={this.state.lesson.student_id}
                    />
                    <FormInput
                        type="number"
                        label={t('lessons.fields.teacherId')}
                        required
                        error={this.state.errors.teacher_id}
                        name="teacher_id"
                        placeholder=""
                        onChange={this.handleChange}
                        value={this.state.lesson.teacher_id}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/lessons"
                    />
                </form>
            </main>
        )
    }
}

export default withTranslation() (LessonsForm)