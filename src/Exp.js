import React,{useState, useEffect} from 'react'
import axios from 'axios'
import './Exp.css'

function Exp() {
    const[num,setNum] = useState(null)
    const[x,setX] = useState("")
    const[y,setY] = useState("")

    useEffect(()=>{
        if(x && y !== ""){
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${x}&lon=${y}&appid=be3e7673377fb8224b6391222c50a13d`)
        .then(res=>{
            console.log(res)
            setNum(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
        }   
    },[x,y])

  return (
    <>
        <div className='main-div'>
        <div className='wrapper'>
            <p className='text'>Enter the Latitude</p>
            <input placeholder='eg.19.09' type='text' className='input1' value={x} onChange={e => setX(e.target.value)} />
            <p className='text' >Enter the Longitude</p>
            <input placeholder='eg.74.74' type='text' className='input2' value={y} onChange={e => setY(e.target.value)} />
        </div>
        <p className='temp'>
            {
               Math.floor(num?.main.temp - 273)
            }°C
        </p>
        <p className='location'> 
            {
               num?.name
            }
        </p>
        </div>
    </>
  )
}

export default Exp