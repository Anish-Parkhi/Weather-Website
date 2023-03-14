import React,{useState, useEffect} from 'react'
import axios from 'axios'
import './Home.css'
import config from './config'
import hazy from './hazy.jpg'
import clear from './image.jpg'
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';


function Home() {

    const[num,setNum] = useState(null) 
    const[x,setX] = useState(28.70)
    const[y,setY] = useState(77.10)

    useEffect(()=>{
        if(x && y !== ""){
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${x}&lon=${y}&appid=${config.api}`)
        .then(res=>{
            console.log(res)
            setNum(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
        }   
    },[x,y])
    console.log("This is num",num)


    const { main, description } = num?.weather[0] ?? "Clear Data";

  return (

    <>
        <div style={{backgroundImage: main === 'Haze' ? `url(${hazy})` : `url(${clear})`}} className='main-div'>
            <div className='left-div'>
                <div className='name-div'>
                   <p className='name'>SkySpy</p>
                </div>
            <div className='wrapper'>
                <input placeholder='Enter the Latitude' type='text' className='input1' value={x} onChange={e => setX(e.target.value)} />
                <input placeholder='Enter the Longitude' type='text' className='input2' value={y} onChange={e => setY(e.target.value)} />
            </div>
            <div>
                <div className='temp-div'>
                    <div className='t'>
                        <p className='temp'>
                            {
                            Math.floor(num?.main.temp - 273)
                            }°C
                        </p>
                        <div className='high'>
                        <p><NorthIcon/> {
                            Math.floor(num?.main.temp_min - 273)
                            }°C 
                        </p>
                        <p>
                            <SouthIcon/>{
                            Math.floor(num?.main.temp_max - 273)
                            }°C
                        </p>
                        </div>
                    </div>
                    {/* <div className='t t1'>
                        <p className='location'> 
                            {
                            num?.name
                            }
                        </p>
                    </div> */}
                    </div>
                    <div className='humid'>
                        <div className='humidity'>
                             <p>Humidity: {num?.main.humidity}%</p>
                        </div>
                        <div className='humidity'>
                             <p> Wind: {num?.wind.speed}m/s</p>
                        </div>
                    </div>
                    
            </div>
            </div>
            <div className='middle-div'></div>
            <div className='right-div'>
                <div style={{paddingBottom:"0px"}} className='right-inner-div'>
                    <div>
                        <p style={{fontSize:" 16px",marginBottom:"0px"}}>Weather forecast</p>
                    </div>
                    {
                        num?.weather.map(item=>{
                            return(
                                <div style={{fontSize:"50px",fontWeight:"bold",marginTop:"0px",marginBottom:"0px",paddingBottom:"5px"}}>
                                    {item.main}
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <p style={{fontSize:"30px", paddingLeft:"3%"}}>{num?.name}</p>
                    {/* <p>{description}</p> */}
                </div>
                <div className='vis'>
                    {/* <p>Visibility: {num?.visibility}m</p> */}
                    {/* <ul>
                        <li>
                            Pressure: {num?.main.pressure} Pa
                        </li>
                        <li>
                            Dew Point: {num?.main.dew_point}
                        </li>
                    </ul> */}
                </div>
            </div>
        </div>
    </>
  )
}

export default Home