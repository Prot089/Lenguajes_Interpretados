import { useState } from "react";

type props = {
    nBotones:number;
}

const Component = ({nBotones}:props) => { // Funcion de flecha ()=>{}
const array = []
    for (let i = 0; i < nBotones; i++) {
        array.push(false)    
    }

    const [activados, setActivados] = useState(array)
    function handleActivado(indice:number){
        let copy = [...activados] //Copia de lo que tiene activados
        copy [indice] = !copy [indice] //Si esta true o si esta false
        setActivados(copy);
    }




  return (
    <div>
        <h1>Component</h1>
        <h2>Divs</h2>
        {
            activados.map((activado, indice)=>{
                return <div key={indice} className={activado ? "prendido":"apagado"}></div>
            })
        }
        <h2>Botones</h2>
        {
             activados.map((activado, indice)=>{
                return <button onClick={()=>{handleActivado(indice)}} key={indice}> {`Boton ${indice}`}</button>
            })
        }
    </div>
  )
}

export default Component
