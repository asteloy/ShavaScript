import React from 'react';
import axios from "axios";
import { useState } from 'react';
import EnterTheChange from './EnterTheChange';
import LeaveTheChange from './LeaveTheChange';

function InterchangePage(props) {
    const { cookies, setCookie } = props.cookies;
    const [theChange, setTheChange] = useState(sessionStorage.getItem('theChange') || false);
    let buttonChange;

    if (theChange === false || theChange === "false") { buttonChange = (<EnterTheChange theChangeProps={{ theChange, setTheChange }} cookiesStorage={{ cookies, setCookie }} />) }
    if (theChange === true || theChange === "true") { buttonChange = (<LeaveTheChange theChangeProps={{ theChange, setTheChange }} cookiesStorage={{ cookies, setCookie }} />) }
    /* beautify ignore:start */
    return <div><div class="fs-3">Привет, {cookies.authData.name} {cookies.authData.surname}! </div>
        <div class="fs-6 fw-bolder" >
            На данный момент вы текущий сотрудник филиала: {cookies.authData.place}
        </div>
        <div class="fs-4 fw-bolder" >
            Текущая касса {cookies.authData.place}: {cookies.totalPrice}
        </div>
        {buttonChange}
    </div>;
    /* beautify ignore:end */
}

export default InterchangePage;

