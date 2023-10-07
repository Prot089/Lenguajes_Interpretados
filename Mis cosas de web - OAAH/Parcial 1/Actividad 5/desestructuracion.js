const personajes =  
  [  
    { id: 1, nombre: 'Solid Snake',   franquicia: 'MetalGear', icono:'📦' },
    { id: 2, nombre: 'Master Chief',  franquicia: 'Halo',      icono:'🟢' },
    { id: 3, nombre: 'Raiden',        franquicia: 'MetalGear', icono:'📦'},
    { id: 4, nombre: 'Big Boss',      franquicia: 'MetalGear', icono:'📦'},
    { id: 5, nombre: 'Cortana',       franquicia: 'Halo',      icono:'🟢'},
    { id: 6, nombre: 'Inquisidor',    franquicia: 'Halo',      icono:'🟢'}
  ]

  //    console.log(personajes);
  const {id,nombre,franquicia,icono} = personajes[1];
  console.log(id, nombre, franquicia, icono);

  const {id:id2,nombre:nombre2,franquicia:franquicia2,icono:icono2} = personajes[0];
  console.log(id2,nombre2,franquicia2,icono2);

  const protagonistas = ['Arthur Morgan', 'Jill Valentine', 'Nathan Drake','Kratos', 'Lara Croft'];
  const [ ,Jill, ,Kratos] = protagonistas;
  console.log(Jill, Kratos);

  function retornoArreglo(){
    return ['ABC', 123,true];
  }

  const [letras,numeros,booleano] =retornoArreglo();
  console.log(letras,numeros,booleano);

  console.log("======Funciones=======");

  function funcionNormie(param1,param2){
    const result=param1+param2;
    console.log(result);
  }

  funcionNormie('Hola','Mundo');
  const constFuncion = (elem)=> {
    console.log(typeof(elem));
  }


  const ob1 = {id:1, nombre:"Javier", edad:21}
  const ob2 = {id:2, nombre:"Diego",  edad:35}
  const ob3 = {id:3, nombre:"Sandra", edad:43}

  console.log("======Arreglos=======");
  // const arrSimple = new Array();
  const arrSimple = [ob1];
  console.log(arrSimple);
  arrSimple.push(ob3);
  arrSimple.push(ob2);
  console.log(arrSimple);

  const personaConIdMenor = arrSimple.filter((obj) => {
    return obj.id <= 1
  })

  const arrResult = document.getElementById("array");

  arrSimple.map((obj) => {
    const p=document.createElement("p");
    const {id, nombre, edad}=obj;
    p.innerText = 'El sujeto '${id}'llamado'${nombre}'tiene'${edad} 'años';
    arrResult.append(p);
  })
