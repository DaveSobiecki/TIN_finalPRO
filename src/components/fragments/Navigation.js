import React from 'react';
import {Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { withTranslation } from 'react-i18next';

class Navigation extends React.Component {

    constructor(props) {
        super(props);
    }
    
    handleLanguagesChange = (language) => {
        const { i18n } = this.props;
        i18n.changeLanguage(language, (err, t) => {
            if (err) {
                return console.log('something went wrong', err);
            }
        });
    }
    render() {
        const {t} = this.props;
        return (
            <nav>
                <ul>
                    <li><Link to="/">{t('nav.content')}</Link></li>
                    <li><Link to="/students">{t('nav.students')}</Link></li>
                    <li><Link to="/teachers">{t('nav.teachers')}</Link></li>
                    <li><Link to="/lessons">{t('nav.lessons')}</Link></li>
                    <li className="lang"><button onClick={() => {this.handleLanguagesChange('pl') }}>PL</button></li>
                    <li className="lang"><button onClick={() => {this.handleLanguagesChange('en') }}>EN</button></li>
                </ul>
            </nav>
        )
    }
}


export default withTranslation() (Navigation)