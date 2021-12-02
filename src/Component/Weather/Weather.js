import React, { useEffect, useState } from 'react';
import DailyWeather from '../DailyWeather/DailyWeather';

const Weather = () => {
    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);
    const [data, setData] = useState([]);
    const [dataa, setDataa] = useState([]);
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
        });
    }, []);
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(result => {
                setData(result)
                // console.log(result);
            });
    }, [lat, long]);
    const convertUnixTimeToLocal = unixTime => {
        const milliSeconds = unixTime * 1000;
        const humanDateFormat = new Date(milliSeconds);
        const convertedTimeObject = {
            fullDate: humanDateFormat.toLocaleString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            }),
            time12h: humanDateFormat.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            }),
        };
        return convertedTimeObject;

    };
    // console.log(dataa);
    const localDate = convertUnixTimeToLocal(data?.dt);
    const localTime = convertUnixTimeToLocal(data?.timezone);
    const loadthreedays = () => {
        console.log("called")
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&&cnt=3&APPID=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(result => {
                setDataa(result.list)
                console.log(result.list);
            })
            ;
    }
    return (
        <div>
            <p>{localDate.fullDate}</p>
            <p>{localTime.time12h}</p>
            <h1>{data?.name}</h1>

            <h5>{data?.main?.temp}°C</h5>
            {data?.weather && <img src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`} alt="Weather icon" />}
            <p>{data?.weather && data?.weather[0].description}</p>

            <button className="btn btn-danger" onClick={() => loadthreedays()}>next 3 days forecast</button>

            {
                dataa.map((datas) => (

                    <DailyWeather key={datas.key} datas={datas}></DailyWeather>

                ))
            }




        </div>
    );
};

export default Weather;