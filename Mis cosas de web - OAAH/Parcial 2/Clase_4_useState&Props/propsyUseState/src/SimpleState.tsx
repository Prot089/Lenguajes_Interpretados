import {useState} from 'react'

type Props = {
    title:string,
    initialN?:number
}



const SimpleState = (props:Props) => {

    const {title,initialN} = props;
    const [valor, setValor] = useState(10) 
    


    function addNumber(){
        setValor(valor + 1); //Par a que la variable de valor no mute porque es constante      
    }
    function addNumber10(){
        setValor(valor + 10)
    }
    function reset(){
        setValor(0)
    }
    function addNumber100(){
        setValor(valor + 100)
    }



  return<>
        <h1>{title}</h1>
        <h2>{valor}</h2>
        <button onClick={reset}>Reset</button>
        <button onClick={addNumber}>Anadir 1+</button>
        <button onClick={addNumber10}>Anadir 10+</button>
        <button onClick={reset}>Reset</button>
        <button onClick={addNumber100}>Anadir 100+</button>
        <button onClick={addNumber10}>Anadir 100+</button>


  </>   
}

export default SimpleState
