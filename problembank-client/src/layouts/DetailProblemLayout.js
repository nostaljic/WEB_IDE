import React from 'react'
import Header from '../components/Header';
import FooterMainPage from '../pages/MainPage/components/FooterMainPage';

function DetailPostLayout(props) {
    const { children } = props;
    return (
        <div className="row">
            <Header/>
            <div className="body-container">
                { children }
            </div>
        </div>
    )
}


export default DetailPostLayout

