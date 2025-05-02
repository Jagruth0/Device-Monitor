import './App.css'
import { useState,useEffect } from "react";
import CPU from './pages/CPU';
import Mem from "./pages/Mem";
import axios from "axios";
import Temp from "./pages/Temp";
import Info from "./pages/Info";
import Process from "./pages/Process";
import AI from "./pages/AI";

function App() {

  const [cpu, setCPU] = useState(0);
  const [cpuarr, setCpuArr] = useState([]);
  const [loadingcpu, setLoadingCpu] = useState(true);
  const [errorcpu, setErrorCpu] = useState(null);
  const [freemem, setFreeMem] = useState(0);
  const [loadingmem, setLoadingMem] = useState(true);
  const [errormem, setErrorMem] = useState(null);
  const [memarr, setMemArr] = useState([]);
  const [totalmem, setTotalMem] = useState(0);
  const [temp, setTemp] = useState(0);
  const [loadingtemp, setLoadingTemp] = useState(true);
  const [errortemp, setErrorTemp] = useState(null);
  const [temparr, setTempArr] = useState([]);
  const [info, setInfo] = useState(0);
  const [loadinginfo, setLoadingInfo] = useState(true);
  const [errorinfo, setErrorInfo] = useState(null);
  const [process, setProcess] = useState(0);
  const [loadingprocess, setLoadingProcess] = useState(true);
  const [errorprocess, setErrorProcess] = useState(null);


  useEffect( ()=>{
          setInterval(() => {
              axios.get('http://raspberrypi.local:8080/cpu')
                  .then((res)=>{
                      setCPU(res.data);
                      setLoadingCpu(false);
                      setCpuArr(prev => {
                          const cur = [...prev, {time: 1, usage: res.data}];
                          return cur.slice(-60)
                      })
                  })
                  .catch((err)=>{
                      setErrorCpu(err.message);
                      setLoadingCpu(false);
                  })
              
              axios.get('http://raspberrypi.local:8080/mem')
                  .then((res)=>{
                      setFreeMem(res.data.freemem);
                      setLoadingMem(false);
                      setTotalMem(res.data.totalmem);
                      setMemArr(prev => {
                          const cur = [...prev, {time: 1, usage: (1- parseFloat((res.data.freemem/res.data.totalmem).toFixed(2)))*100}];
                          return cur.slice(-60)
                      })
                  })
                  .catch((err)=>{
                      setErrorMem(err.message);
                      setLoadingMem(false);
                  })
              
              axios.get('http://raspberrypi.local:8080/temp')
                .then((res)=>{
                    setTemp(res.data);
                    setLoadingTemp(false);
                    setTempArr(prev => {
                        const cur = [...prev, {time: 1, usage: parseFloat(res.data)}];
                        return cur.slice(-60)
                    })
                })
                .catch((err)=>{
                    setErrorTemp(err.message);
                    setLoadingTemp(false);
                })
              axios.get('http://raspberrypi.local:8080/info')
                .then((res)=>{
                    setInfo(res.data);
                    setLoadingInfo(false);
                })
                .catch((err)=>{
                    setErrorInfo(err.message);
                    setLoadingInfo(false);
                })
              axios.get('http://raspberrypi.local:8080/process')
                .then((res)=>{
                    setProcess(res.data);
                    setLoadingProcess(false);
                })
                .catch((err)=>{
                    setErrorProcess(err.message);
                    setLoadingProcess(false);
                })
          }, 2000);
      }, []);

  return (
    <div>
        <h2>Device Monitor</h2>
      <div className='grid-container'>
        <CPU cpu={cpu} cpuarr={cpuarr} loading={loadingcpu} error={errorcpu}/>
        <Mem freemem={freemem} totalmem={totalmem} memarr={memarr} loading={loadingmem} error={errormem} />
        <Temp temp={temp} temparr={temparr} loading={loadingtemp}  error={errortemp} />
        <Process process={process} loading={loadingprocess} error={errorprocess}/>
        <AI />
      </div>
        <Info info={info} loading={loadinginfo} error={errorinfo}/>
      <div></div>
    </div>
  )
}

export default App
