import React, { memo, useEffect, useRef, useState } from "react";
import moment from "moment";
import Loading from "../spinner/Loading";
import styles from "./Weather.module.css";

const iconURL = "https://openweathermap.org/img/wn/";
const WeatherInfo = function(props) {
    const NOT_FOUND = "City Not Found";
    const EMPTY = "";
    
    return (        
        <div className={styles.infoBoard}>
            <div className={styles.row}>      
                {
                    props.error ? NOT_FOUND : 
                       props.current.name ? <WeatherInfoRender {...props} /> : EMPTY
                }               
            </div>
        </div>
    )
}
export default memo(WeatherInfo);

function WeatherInfoRender(props) {
    const [daily, setDaily] = useState(null);     
    let count = 0;

    const handleBack = () => {
        setDaily(null);
    }
    
    return(
        <div className={styles.wrapper}>
            {
                props.loading ? <Loading show={true} /> : <Loading show={false} />
            }
            {
                daily ? <ForecastDetails daily={daily} back={handleBack}/> :
                    <div>
                        <div className={styles.row}>
                            <span className={styles.header}>
                                {
                                    props.current.name
                                }
                            </span>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.current}>
                                <div className={styles.item}>
                                    <div>
                                        <div className={styles.wicon}>
                                            <img
                                                src={iconURL + props.current.weather[0].icon + "@2x.png"}
                                                // src={props.icon}
                                                alt="Weather icon" />
                                        </div>
                                        <div className={styles.header}>
                                            {
                                                props.current.weather[0].description
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.item}>
                                    <div className={styles.temp}>
                                        <span>
                                            {
                                                Math.ceil(props.current.main.temp)
                                            }&#176;C
                            </span>
                                    </div>
                                </div>
                                <div className={styles.item} />
                                <div className={styles.item}>
                                    <div className={styles.sys}>
                                        <span className={styles.sys_item}>
                                            <span>Wind: </span>
                                            {
                                                props.current.wind.speed
                                            } m/s
                            </span>
                                        <span className={styles.sys_item}>
                                            <span>Sunrise: </span>
                                            {
                                                moment.unix(props.current.sys.sunrise).format("hh:mm A")
                                            }
                                        </span>
                                        <span className={styles.sys_item}>
                                            <span>Sunset: </span>
                                            {
                                                moment.unix(props.current.sys.sunset).format("hh:mm A")
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.small_title}>5-day forecast</div>
                        <div className={styles.row}>
                            <div className={styles.forecast}>
                                {
                                    props.forecast.daily.map((d, index) => {
                                        if (d.dt > props.current.dt && count < 5) {
                                            count++;
                                            return (
                                                <div key={index} className={styles.item} 
                                                    onClick={(e) => setDaily(
                                                        {
                                                            day: d,
                                                            weekday: moment(moment.unix(d.dt)).format("dddd")
                                                        })}>
                                                    <span className={styles.weekday}>
                                                        {
                                                            // Get weekday of a moment
                                                            // ddd: short name of weekday like 'Mon'
                                                            // dddd: full name of weekday like 'Monday'
                                                            moment(moment.unix(d.dt)).format("ddd")
                                                        }
                                                    </span>
                                                    <span className={styles.wficon}>
                                                        <img
                                                            src={iconURL + d.weather[0].icon + ".png"}
                                                            alt="Weather icon" />
                                                    </span>
                                                    <span className={styles.temp}>
                                                        {
                                                            Math.ceil(d.temp.day)
                                                        }&#176;C
                                        </span>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

function ForecastDetails(props) {
    const day = props.daily.day;
    const [width, setWidth] = useState(0);
    const height = 130;

    useEffect(() => {
        setWidth(Number(document.getElementById('forecastDetailID').clientWidth));
    });

    return (
        <div id="forecastDetailID">
            <div className={styles.buttonStrip}>
                <button className={`${styles.backButton} ${styles.round}`}
                    onClick={(e) => {props.back()}}>&#8249;</button>
                <div className={styles.row}>
                    <span className={styles.header}>
                        {
                            props.daily.weekday
                        }
                    </span>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.current}>
                    <div className={styles.item}>
                        <div>
                            <div className={styles.wicon}>
                                <img
                                    src={iconURL + day.weather[0].icon + "@2x.png"}
                                    // src={props.icon}
                                    alt="Weather icon" />
                            </div>
                            <div className={styles.header}>
                                {
                                    day.weather[0].description
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.temp}>
                            <span>
                                {
                                    Math.ceil(day.temp.day)
                                }&#176;C
                        </span>
                        </div>
                    </div>
                    <div className={styles.item} />
                    <div className={styles.item}>
                        <div className={styles.sys}>
                            <span className={styles.sys_item}>
                                <span>Humidity: </span>
                                {
                                    day.humidity
                                }<small>%</small>
                            </span>
                            <span className={styles.sys_item}>
                                <span>Wind deg: </span>
                                {
                                    day.wind_deg
                                }&#176;
                            </span>
                            <span className={styles.sys_item}>
                                <span>Wind speed: </span>
                                {
                                    day.wind_speed
                                } <small>m/s</small>
                            </span>                            
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.weatherChart}>
                    <WeatherChart 
                        width={width}
                        height={height}
                        day={day} />
                </div>
            </div>
        </div>
        );
}

function WeatherChart(props) {
    const temp = props.day.temp;
    const mainCanvas = useRef(null);
    const width = props.width;
    let height = props.height;
    let x0 = 40; // Original start Top
    let y0 = 30; // Original start Left               
    
    useEffect(() => {
        if (props.width > 0) {
            drawCanvas();
        }
    }, [props.width]);

    const drawCanvas = () => {
        // Get canvas context
        const ctx = mainCanvas.current.getContext("2d");
        
        // Draw main canvas                
        ctx.beginPath();
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "white"; // "#e7e6e6";
        ctx.fillRect(0, 0, width, height);
        ctx.closePath();
        
        // Calculate 1-unit for 1-temperature degree,
        // based on the current canvas's height mapping
        // with the current maximum of temperature.
        const unit = Math.ceil((1 * height) / temp.max);
        height += 2 * y0;

        // The display orders of temperatures:
        // min -> max   
        // Distance of every point
        const X_DISTANCE = Math.ceil(width / 4);        
      
        let minMaxPoints = [];        
        let points = []; console.log(temp);

        minMaxPoints.push(
            {
                key: 'min',
                temp: getTempString(temp.min),
                x1: x0,
                y1: 1.20 * height - temp.min * unit
            }
        );

        minMaxPoints.push(
            {
                key: 'max',
                temp: getTempString(temp.max),
                x1: 5 * X_DISTANCE,
                y1: 1.20 * height - temp.max * unit
            }
        );
        
        // morn -> day -> eve -> night
        let x1 = x0; 
        let y1 = height - temp.morn * unit;  
        let x2 = x1 + X_DISTANCE;  
        let y2 = height - temp.day * unit; 
        points.push(
            {
                key: 'morning',
                temp: getTempString(temp.morn),
                x1: x1, y1: y1, x2: x2, y2: y2
            }
        );

        x1 = x2;
        y1 = y2;
        x2 = x1 + X_DISTANCE;
        y2 = height - temp.eve * unit;
        points.push(
            {
                key: 'day',
                temp: getTempString(temp.day),
                x1: x1, y1: y1, x2: x2, y2: y2
            }
        );

        x1 = x2;
        y1 = y2;
        x2 = x1 + X_DISTANCE;
        y2 = height - temp.night * unit;
        points.push(
            {
                key: 'evening',
                temp: getTempString(temp.eve),
                x1: x1, y1: y1, x2: x2, y2: y2
            }
        );

        x1 = x2;
        y1 = y2;
        points.push(
            {
                key: 'night',
                temp: getTempString(temp.night),
                x1: x1, y1: y1, x2: 0, y2: 0
            }
        );                         
       
        drawShape(ctx, null, points);
    }

    const getTempString = (temp) => {
        return Math.ceil(temp) +  "°";
    }

    const drawShape = (ctx, minMaxPoints, points) => {
        const r = 4;  // Circle radius
        const CIRLE_LINE_WIDTH = 2;
        const CIRCLE_STROKE_STYLE = "#c4c5c7";
        const CIRCLE_FILL_STYLE = "#4f6072";
        const LINE_LINE_WIDTH = 2;        
        const LINE_STROKE_STYLE = "#c4c5c7";
        const LINE_FILL_STYLE = "#000000"; 
        const TEMPERATURE_TEXT_FILL_STYLE = "#000000";
        const TEMPERATURE_TEXT_FONT = "18px Arial"; 
        const DAY_TEXT_FONT = "12px Verdana";     
        const DAY_TEXT_FILL_STYLE = "#000000";  
        const X_TEXT_ALIGN = 10;
        const Y_TEXT_ALIGN = 12;

        if(minMaxPoints) {
            // 1. Draw numbers of min and max temperature
            ctx.font = TEMPERATURE_TEXT_FONT;
            ctx.fillStyle = TEMPERATURE_TEXT_FILL_STYLE;
            ctx.beginPath();
            // Draw min temperature
            ctx.fillText(minMaxPoints[0].temp, minMaxPoints[0].x1 - X_TEXT_ALIGN, minMaxPoints[0].y1 - Y_TEXT_ALIGN);
            // Draw max temperature
            ctx.fillText(minMaxPoints[1].temp, minMaxPoints[1].x1 - X_TEXT_ALIGN, minMaxPoints[1].y1 - Y_TEXT_ALIGN);
            ctx.closePath();

            // 2. Draw day text 
            ctx.font = DAY_TEXT_FONT;
            ctx.fillStyle = DAY_TEXT_FILL_STYLE;
            ctx.beginPath();
            ctx.fillText(minMaxPoints[0].key, minMaxPoints[0].x1 - 15, minMaxPoints[0].y1 + 20);
            ctx.closePath();
            ctx.beginPath();
            ctx.fillText(minMaxPoints[1].key, minMaxPoints[1].x1 - 15, minMaxPoints[1].y1 + 20);
            ctx.closePath();

            // 3. Draw curve line from min to max temperature
            ctx.lineWidth = LINE_LINE_WIDTH;
            ctx.strokeStyle = LINE_STROKE_STYLE;
            ctx.fillStyle = LINE_FILL_STYLE;
            ctx.beginPath();
            ctx.moveTo(minMaxPoints[0].x1, minMaxPoints[0].y1); // First point
            // ctx.bezierCurveTo(
            //     minMaxPoints[0].x1, minMaxPoints[0].y1, // Bottom left point
            //     minMaxPoints[1].x1, minMaxPoints[0].y1, // Bottom right point
            //     minMaxPoints[1].x1, minMaxPoints[1].y1, // top right point
            //     );
            ctx.quadraticCurveTo(
                minMaxPoints[1].x1, minMaxPoints[0].y1, // Bottom right point
                minMaxPoints[1].x1, minMaxPoints[1].y1, // top right point
            );
            ctx.stroke();
            ctx.closePath();

            // 4. Draw circle points of min and max temperature
            ctx.lineWidth = CIRLE_LINE_WIDTH;
            ctx.strokeStyle = CIRCLE_STROKE_STYLE;            
            ctx.fillStyle = CIRCLE_FILL_STYLE;

            ctx.beginPath();
            ctx.arc(minMaxPoints[0].x1, minMaxPoints[0].y1, r, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.arc(minMaxPoints[1].x1, minMaxPoints[1].y1, r, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();            
        }

        if (points) {

            let count = 0;
            points.forEach((point) => {
                ++count;
                // 1. Draw number of temperature
                ctx.font = TEMPERATURE_TEXT_FONT;
                ctx.fillStyle = TEMPERATURE_TEXT_FILL_STYLE;
                ctx.beginPath();
                ctx.fillText(point.temp, point.x1 - X_TEXT_ALIGN, point.y1 - Y_TEXT_ALIGN);
                ctx.closePath();

                // 2. Draw day text 
                ctx.font = DAY_TEXT_FONT;
                ctx.fillStyle = DAY_TEXT_FILL_STYLE;
                ctx.beginPath();
                ctx.fillText(point.key, point.x1 - 15, point.y1 + 20);
                ctx.closePath();

                // 3. Draw link between temperature points
                ctx.lineWidth = LINE_LINE_WIDTH;
                ctx.strokeStyle = LINE_STROKE_STYLE;
                ctx.fillStyle = LINE_FILL_STYLE;

                if (count < points.length) {
                    ctx.beginPath();
                    ctx.moveTo(point.x1, point.y1);
                    ctx.lineTo(point.x2, point.y2);
                    ctx.stroke();
                    ctx.closePath();
                }                

                // 4. Draw circle point of every temperature
                ctx.lineWidth = CIRLE_LINE_WIDTH;
                ctx.strokeStyle = CIRCLE_STROKE_STYLE;
                ctx.fillStyle = CIRCLE_FILL_STYLE;
                ctx.beginPath();
                ctx.arc(point.x1, point.y1, r, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
            });
        }   
    }

    return(
        <div className='canvas-container'>
            <div className='canvas'>
                <canvas
                    id='mainCanvas'
                    ref={mainCanvas}
                    width={width}
                    height={height}>
                </canvas>
            </div>            
        </div >
    );
}