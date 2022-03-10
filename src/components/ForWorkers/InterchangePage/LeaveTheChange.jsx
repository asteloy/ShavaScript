import React from 'react';

const LeaveTheChange = ({
    cookiesStorage,
    theChangeProps
}) => {
    const { cookies, setCookie } = cookiesStorage;
    const { theChange, setTheChange } = theChangeProps;

    const handleSubmit = e => {
        e.preventDefault();
        setTheChange(false);
        sessionStorage.setItem('theChange', false);
        setCookie('userStatus', "Not at work", { path: '/' });
    }

    return (
        /* beautify ignore:start */
        <form onSubmit={handleSubmit}>
            <button style={{ width: '100%' }} className="btn btn-danger mt-2">Закончить смену</button>
        </form>
        /* beautify ignore:end */
    )
}

export default LeaveTheChange;