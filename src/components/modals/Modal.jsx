import React, {useState,useEffect} from 'react'
import useFetch from '../../hook/useFetch'




export default function Modal({shava, setCustom, cookie, setCookie}) {

    const [data,setData] = useState([])



    const {isLoading, serverError, apiData} = useFetch(
        "GET",
        "https://shrouded-lake-15223.herokuapp.com/product/all",
        {}
    )
    
    useEffect(() => {
        if (!isLoading && apiData) setData(apiData)
    }, [isLoading])

    let topings = data.filter(product => product.category === 'toping').map(toping =>{
        return {
            ...toping,
            checked: false,
            count:1
        }
    })

    function handleChecked (toping) {
        toping.checked = !toping.checked
    }

    function getCustomShava(){
        const checkedTopings = topings.filter(toping => (toping.checked !== false))
        checkedTopings.map(toping => {
            delete toping.checked
        })

        shava.count = 1
        
        let customShava = [...cookie.cart, shava, ...checkedTopings]

        setCookie('cart', [...customShava], {path: '/'})

        setCustom(false)
        }
        
    

  return (
        <div>
            {topings.map(toping => <div key={toping.id}>
                <span className="form-check form-switch">
                <input className="form-check-input" type="checkbox" onChange={() => handleChecked(toping)}/><p>{toping.name} (+ {toping.price} рублей)</p>
                </span>
            </div>)}
        <button type="button" className="btn btn-primary" onClick={getCustomShava}>Добавить в корзину</button>
    </div>
  )
}
