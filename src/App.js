import './App.css';
import Navigation from "./components/User/Nav/Navigation";
import NavigationWorker from "./components/User/Nav/NavigationWorker";
import ProductList from "./components/User/Product/ProductList";
import LogInAction from "./components/LogIn/LogInAction";
import Cart from "./components/User/Cart/Cart";
import Order from "./components/User/Order/Order";
import InterchangePage from "./components/ForWorkers/InterchangePage/InterchangePage";
import {
    Map
} from './components/Map/Map';
import {
    useCookies
} from "react-cookie";
import {
    useState
} from "react";




function App() {
    const [cookies, setCookie] = useCookies(['cart', 'order', 'authData'], );
    const [activePage, setActivePage] = useState(sessionStorage.getItem('page') || 'Главная');
    const [activeUser, setActiveUser] = useState(sessionStorage.getItem('user') || 'defaultUser')

    console.log(cookies);
    let content = null;
    let navigation = null;
    /* beautify ignore:start */
    switch (activeUser) {
        case 'defaultUser':
            navigation = <Navigation page={activePage} coocki={{cookies, setCookie}} repage={changePage}/>
            break;
        case 'fired':
            navigation = <Navigation page={activePage} coocki={{cookies, setCookie}} repage={changePage}/>
            break;
        case 'worker':
            navigation = <NavigationWorker page={activePage} coocki={{cookies, setCookie}} repage={changePage}  logOut={logOut}/>
            break;
        case 'admin':
            navigation = <Navigation page={activePage} coocki={{cookies, setCookie}} repage={changePage}/>
            break;
        default:
            navigation = <Navigation page={activePage} coocki={{cookies, setCookie}} repage={changePage}/>
            break;
    }
    /* beautify ignore:end */

    /* beautify ignore:start */
    switch (activePage) {
        case 'Главная':
            content = <ProductList cookies={{cookies, setCookie}}/>
            break;
        case 'Корзина':
            content = <Cart cookies={{cookies, setCookie}}/>
            break;
        case 'Мои заказы':
            content = <Order {...{cookies, setCookie}}/>
            break;
        case 'Контакты':
            content = <Map cookies={{cookies, setCookie}}/>
            break;
        case 'Войти':
            content = <LogInAction cookies={{cookies, setCookie}} setActiveUser={{activeUser, changeActiveUser}}/>
            break;
        case 'У окна':
            content = <ProductList cookies={{cookies, setCookie}}/>
            break;
        case 'Страница смены':
            content = <InterchangePage cookies={{cookies, setCookie}}/>
            break;
        case 'Страница заказов':
            content = <Order {...{cookies, setCookie}}/>
            break;
        case 'Администрирование':
            content = <h1>Администрирование контент</h1>
            break;
        default:
            content = <ProductList cookies={{cookies, setCookie}}/>
            break;
    }
    /* beautify ignore:end */
    function changePage(e) {
        if (e === "Главная") {
            setActivePage(e);
            return;
        };
        if (e === "Страница смены") {
            setActivePage(e);
            return;
        };
        e.preventDefault();
        if (e.target.text === activePage) return
        setActivePage(e.target.dataset.page);
        sessionStorage.setItem('page', e.target.dataset.page)
    }

    function logOut() {
        setActiveUser('defaultUser')
        setCookie('authData', undefined, {
            path: '/'
        });
        sessionStorage.setItem('user', cookies.authData.role);
        changePage("Главная");
    }


    function changeActiveUser(role) {
        setActiveUser(role);
        console.log(role);
        sessionStorage.setItem('user', role);
        changePage("Страница смены");
    }
    /* beautify ignore:start */
    return (
        <>
            <header>
                {navigation}
            </header>
            <main>
                <div className="container mt-5">
                    <h3>{activePage === 'Главная' ? 'Продукты' : activePage}</h3>
                    {content}
                </div>
            </main>
        </>
    );
    /* beautify ignore:end */
}

export default App;