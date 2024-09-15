import React, {useEffect, useState} from 'react'
import words from './Words';

const Tester = () => {
    const [typed, setTyped] = useState("");
    const [remain, setRemain] = useState("")
    const [errCount, setErrCount] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [wpm, setWpm] = useState(0);
    const [acc, setAcc] = useState(0);
    function reload(){
        window.location.reload(false);
    }

    function handleChange(e) {
        if(remain===""){
            return;
        }
        if(typed===""){
            const d = new Date();
            setStartTime(d.getTime());
        }
        if(remain.length===1){
            const d = new Date();
            const time = (d.getTime() - startTime)/60000;
            setWpm((20/time).toFixed(2));
        }
        
        const key = e.key;
        if(key.length === 1)
        {
            if(!remain.startsWith(key))
                setErrCount(errCount+1);
            setTyped((prevTyped)=>{
                return prevTyped.replace('|', '') +remain[0]+"|";
            });
            setRemain((prevRemain)=>{
                return prevRemain.substring(1);
            });
            remainingcont.textContent = text.substring(typed.length);
        }
    }
    useEffect(()=>{
        if(remain===""){
            setAcc((100 - (errCount*100/typed.length)).toFixed(2));
        } else {
            setAcc(0);
        }
        document.addEventListener("keydown", handleChange);

        return () => {
            document.removeEventListener("keydown", handleChange);
        }
        
    }, [typed, remain])
    useEffect(()=>{
        let text = "";
        for(let i=0; i<20; i++){
            let idx = Math.floor(Math.random() * (3103));
            text+= " " + words[idx];
        }
        setRemain(()=>{
            return text.trim();
        });
    }, [])
  return (
    <div>
        <h1 className='text-4xl'>WPM: {wpm}</h1>
        <h1 className='text-4xl'>Error Count: {errCount}</h1>
        <h1 className='text-4xl'>Accuracy : {acc}</h1>
        <button className='my-5' onClick={reload}>Reset</button>
      <div className='my-10'>
      <span className='text-slate-500 text-4xl'>{typed}</span>
      <span className='text-4xl'>{remain}</span>
      </div>
    </div>
  )
}

export default Tester
