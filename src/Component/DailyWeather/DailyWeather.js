import React from 'react';
import './DailyWeather.css';
const DailyWeather = ({ datas }) => {
    console.log(datas);
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
    const localDate = convertUnixTimeToLocal(datas?.dt);

    return (
        <div className="container d-flex align-items-center justify-content-center mt-3" >
            <div className="daily-weather">
                <p>{localDate.fullDate}</p>
                <div className="temp">
                    <h5>{datas?.main?.temp}°C</h5>
                    {datas?.weather && <img src={`https://openweathermap.org/img/wn/${datas?.weather[0]?.icon}@2x.png`} alt="Weather icon" />}
                </div>

                <p>{datas?.weather && datas?.weather[0].description}</p>


            </div>
        </div>
    );
};

export default DailyWeather;