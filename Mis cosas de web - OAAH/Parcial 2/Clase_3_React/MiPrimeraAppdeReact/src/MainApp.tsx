import Tarjeta from "./components/Tarjeta"

const MainApp = () => {

    const ShowPerson = (name:string, age:number, status:boolean, extra:any) => {
        return (
            <>
            <h1>Hola Soy {name}</h1>
            <h3>Tengo {age} anios</h3>
            <p>Actualmente estoy {status ? "vivo":"muerto"}</p>
            {
                extra ?
                <p>{extra.text}</p> : " "
            }
            </>
        )
    }
          
        return (
            <>
                <h1>Hola Mundo React</h1>
                <p>Buenas esto es un parrafo</p>
                {
                    ShowPerson("Alejandro Angeles", 23, true,{text:"Jijijijajaja"})
                }
                <Tarjeta/>
            </>
        )
}

export default MainApp