import React from 'react';
import axios from "axios";
import LogInForm from './LogInForm';
import { useState } from 'react';
import { wait } from '@testing-library/user-event/dist/utils';

const logInData = {
    email: '',
    password: '',
};

function LogInAction(props) {
    const { cookies, setCookie } = props.cookies;
    const { activeUser, changeActiveUser } = props.setActiveUser;
    const [errorMessage, setErrorMessage] = useState(<></>)

    async function onSubmit(logInData) {
        const users = await axios.post('http://localhost:5000/user/login', logInData).then(res => res.data)
            .catch((error) => setErrorMessage(<div class="text-danger">Не верно введены данные!</div>))
        if (users !== undefined) changeActiveUser(users.role);
        setCookie('authData', users, { path: '/' });
    }

    async function getTotoalPrice() {
        const totalPrice = await axios.get('./mock-up/totalPrice.json').then(res => res.data);
        setCookie('totalPrice', totalPrice, { path: '/' });
    }

    /* beautify ignore:start */
    const logInForm = <LogInForm initialData={logInData} onSubmit={onSubmit} errorMessage={(errorMessage)} getTotoalPrice={getTotoalPrice} />;
    return <div>
        {logInForm}
    </div>;
    /* beautify ignore:end */
}


export default LogInAction;