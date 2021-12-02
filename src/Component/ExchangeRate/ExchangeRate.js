import React, { useEffect, useState } from 'react';
import './ExchangeRate.css';
const ExchangeRate = () => {
    const [currency, setCurrency] = useState();
    const [country, setCountry] = useState([]);
    useEffect(() => {
        fetch("http://ip-api.com/json?fields=status,country,currency")
            .then((res) => res.json())
            .then(result => setCountry(result.currency))
    })
    useEffect(() => {
        fetch(`https://freecurrencyapi.net/api/v2/latest?apikey=${process.env.REACT_APP_CURRENCY_API_KEY}&base_currency=${country}`)
            .then((res) => res.json())
            .then(result => setCurrency(result))
    }, [country])


    return (
        <div className="currency">
            <div className="d-flex align-items-center justify-content-center">
                <div>
                    <p>Currency </p>
                    <p>{country}  </p>
                </div>
                <div>
                    <p> to Price USD </p>
                    <p>{currency?.data?.USD}</p>
                </div>
            </div>

            <br />
            <div className="d-flex align-items-center justify-content-center">
                <div>
                    <p>Currency  </p>
                    <p>{country}  </p>
                </div>
                <div>
                    <p> to Price EUR </p>
                    <p> {currency?.data?.EUR}</p>
                </div>
            </div>
        </div>
    );
};

export default ExchangeRate;