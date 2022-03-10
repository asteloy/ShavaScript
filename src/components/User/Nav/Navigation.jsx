import React, {useEffect, useState} from "react";


export default function Navigation(props) {
    const [lengthCart, setLengthCart] = useState(null);
    const {repage, page} = props;
    const {cookies, setCookie} = props.coocki;

    function getLengthCart() {
        if (!cookies.cart) return 0;
        return cookies.cart.reduce((acc, item) => acc + item.count, 0);
    }

    useEffect(() => {
        setLengthCart(getLengthCart() || 0);
    }, [])

    useEffect(() => {
        setLengthCart(getLengthCart);
    }, [cookies.cart])

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a onClick={repage} data-page="Главная" className="navbar-brand" href="/">
                        <img src="/images/logo2.png" alt="" width="30" height="24"
                             className=" d-inline-block align-text-center"/>
                        ShavaScript
                    </a>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a data-page="Главная" className={`nav-link ${page === 'Главная' ? 'active' : ''}`}
                               aria-current="page" href="/"
                               onClick={repage}>Главная</a>
                        </li>
                        <li className="nav-item">
                            <a data-page="Мои заказы" className={`nav-link ${page === 'Мои заказы' ? 'active' : ''}`}
                               href="/"
                               onClick={repage}>Мои заказы</a>
                        </li>
                        <li className="nav-item">
                            <a data-page="Контакты" href="/"
                               className={`nav-link ${page === 'Контакты' ? 'active' : ''}`}
                               onClick={repage}>Контакты</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav d-flex">
                        <li className="nav-item">
                            <a data-page="Войти" href="/" className={`nav-link ${page === 'Войти' ? 'active' : ''}`}
                               onClick={repage}><i
                                className="bi bi-door-open"></i> Войти</a>
                        </li>
                        <li className="nav-item d-f" onClick={repage} data-page="Корзина">
                            <div className="container-fluid d-flex align-items-center">
                                <span>{lengthCart}</span> <a
                                className={`nav-link ${page === 'Корзина' ? 'active' : ''}`} href="/"
                                onClick={repage} data-page="Корзина"
                            >
                                <i onClick={repage} data-page="Корзина" className="bi bi-bag"></i></a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}