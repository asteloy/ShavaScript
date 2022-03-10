import React, {useState} from 'react'
import Modal from '../../modals/Modal';

export default function ProductCard(props) {
    const countProductInCart = props.countProduct(props.product.id) || 0
    //  `${countProductInCart === 5 ? 'disabled' : ''}`
    let onclickFunc;
    if (props.product.category === "main" ) {
        onclickFunc = () => props.addToCart(props.product);
    } else {
        onclickFunc = () => props.addToCart(props.product);
    }

    const [custom, setCustom] = useState(false)

    return (
        <>
        <div className="card product p-2 m-3 d-flex flex-column justify-content-between" style={{width: '18rem'}}>
            <img className="card-img-top p-3" style={{height: '18rem'}} src={props.product.image}
                 alt={props.product.name}/>
            <div className="m-2">
                <h5 className="card-title">{props.product.name}</h5>
                <p className="card-text">{props.product.description}</p>
                <p className="card-text">{props.product.price} ₽</p>
                {countProductInCart > 0 ?
                    <div>
                        <div className="btn-group d-flex justify-content-center align-items-lg-center gap-3 mt-3"
                             role="group" aria-label="Basic example">
                            {props.product.category !== 'main' ? 
                            <>
                                <button type="button" className="btn btn-primary" onClick={() => props.removeCart(props.product)}>
                                    <i className="bi bi-dash"></i>
                                </button>
                                <p className="m-0 p-0 text-center">{countProductInCart} шт</p>
                                <button type="button" disabled={countProductInCart === 5 ? true : ''}
                                    className="btn btn-primary" onClick={onclickFunc}>
                                <i className="bi bi-plus"></i>
                            </button>
                            </>
                            :
                            <>
                                <button type="button" className="btn btn-danger align-items-lg-center" onClick={() => props.removeCart(props.product)}>
                                    Удалить
                                </button>
                            </>
                            }
                        </div>
                    </div>
                    :
                    <>
                        {props.product.category === "main" ?
                        <div>
                            {!custom &&
                            <button type="button" className="btn btn-primary" onClick={() => setCustom(prev => !prev)} >
                            Собрать шаурму
                            </button>
                            }
                            {custom && <Modal cookie={props.cookies} setCookie={props.setCookie} setCustom={setCustom} addToCart={props.addToCart} shava={props.product}/>}
                        </div>
                            :
                            <button className="btn btn-primary" onClick={onclickFunc}>В
                                корзину
                            </button>
                        }
                    </>
                }
            </div>
        </div>
        </>
    )
}
