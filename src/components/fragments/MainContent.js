import React from 'react';
import { useTranslation } from 'react-i18next';

function MainContent(){

    const {t} = useTranslation();

    return(
        <main>
        <h2>{t('main-page.content')}</h2>
        <div className="main-content-div">
            <p className="long-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar nec nisl id
                imperdiet. Nulla
                scelerisque a turpis dignissim aliquam. Ut purus ligula, fringilla vitae lacinia ac, porttitor nec erat.
                Nulla
                fringilla convallis nunc vehicula ullamcorper. Integer ullamcorper mi non eros laoreet eleifend. Proin
                lobortis
                ac mi at condimentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar nec nisl
                id imperdiet. Nulla
                scelerisque a turpis dignissim aliquam. Ut purus ligula, fringilla vitae lacinia ac, porttitor nec erat.
                Nulla
                fringilla convallis nunc vehicula ullamcorper. Integer ullamcorper mi non eros laoreet eleifend. Proin
                lobortis
                ac mi at condimentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar nec nisl
                id imperdiet. Nulla
                scelerisque a turpis dignissim aliquam. Ut purus ligula, fringilla vitae lacinia ac, porttitor nec erat.
                Nulla
                fringilla convallis nunc vehicula ullamcorper. Integer ullamcorper mi non eros laoreet eleifend. Proin
                lobortis
                ac mi at condimentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar nec nisl
                id imperdiet. Nulla
                scelerisque a turpis dignissim aliquam. Ut purus ligula, fringilla vitae lacinia ac, porttitor nec erat.
                Nulla
                fringilla convallis nunc vehicula ullamcorper. Integer ullamcorper mi non eros laoreet eleifend. Proin
                lobortis
                ac mi at condimentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar nec nisl
                id imperdiet. Nulla
                scelerisque a turpis dignissim aliquam. Ut purus ligula, fringilla vitae lacinia ac, porttitor nec erat.
                Nulla
                fringilla convallis nunc vehicula ullamcorper. Integer ullamcorper mi non eros laoreet eleifend. Proin
                lobortis
                ac mi at condimentum.
            </p>
            </div>
        </main>
    )
}

export default MainContent