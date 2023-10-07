//Snippet de typescript

type Props = {
    categorias: string[],
    filterItems: (parametro:string) => void,

}

const Categorias = ({categorias,filterItems}:Props)=>{
    return (
        <div className="flex">{
            categorias.map((categoria, indice) =>{
                return <button 
                            key={indice} 
                            onClick={()=> filterItems(categoria)}>
                            {categoria}
                            </button>
            })
        }

        </div>
    );
}

export default Categorias;