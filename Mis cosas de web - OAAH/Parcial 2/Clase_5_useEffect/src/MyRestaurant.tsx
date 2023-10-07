// import { FoodData } from "./types/types"

import { useEffect, useState } from "react"
import Categorias from "./components/Categorias";
import { FoodData } from "./types/types";
import ShowMenu from "./components/ShowMenu";

const url = 'https://profechino.github.io/data-repo/menu.json'



const MyRestaurant = () => {
  
  //NUNCA UTILIZAR LOS USESTATES COMO CONDICIONALES
  const [loading, setLoading] = useState(true)
  const [allFoods, setAllFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [categorias, setCategorias] = useState<string[]>([]);

  const fetchMenu = async ()=>{
    setLoading(true);
    try{
      const response = await fetch(url)
      const menu = await response.json(); //Lo convertimos en json 
      const FoodDatos = menu.map((data: FoodData)=>{return data as FoodData})

      setAllFoods(FoodDatos);
      setCategorias(["todos", ...new Set<string>(FoodDatos.map(({category}:FoodData)=>category))]);
      setFilteredFoods(FoodDatos);
      

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  function filterFoods(categoria:string){
    if(categoria=== 'todos'){
      setFilteredFoods(allFoods);
      return
    }

    const filter = allFoods.filter((foodItem:FoodData)=> foodItem.category === categoria);
    setFilteredFoods(filter);
  }

  //fetchMenu();
useEffect(()=>{
  //Codigo de inicializacion
  fetchMenu();


  return () => {
    //Codigo de limpieza

  }
},[/*Dependencias*/]) //Se ejecuta una sola vez

  if(loading){
    return <h1>Loading...</h1>
  }


  return (
    <>
      {/* <h1>MyRestaurant</h1>{
        categorias.map((categoria, indice)=>{
          return <button key={indice}>{categoria}</button>
        })
      }

<ul>
  {
    allFoods.map(({id,title}:FoodData) =>{
      return <li key={id}>{title}</li>
    })
  }
</ul> */}

<section className="center">
  <Categorias categorias={categorias} filterItems={filterFoods}/>
  <ShowMenu foods={filteredFoods}/>

</section>
    </>    
  )
}

export default MyRestaurant