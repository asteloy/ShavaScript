import React from 'react';

const EnterTheChange = ({
    cookiesStorage,
    theChangeProps
}) => {
    const { cookies, setCookie } = cookiesStorage;
    const { theChange, setTheChange } = theChangeProps;

    const handleSubmit = e => {
        e.preventDefault();
        setTheChange(true)
        sessionStorage.setItem('theChange', true);
        setCookie('userStatus', "At work", { path: '/' });
    }

    return (
        /* beautify ignore:start */
        <form onSubmit={handleSubmit}>
            <button style={{ width: '100%' }} className="btn btn-success mt-2">Начать смену</button>
        </form>
        /* beautify ignore:end */
    )
}

export default EnterTheChange;