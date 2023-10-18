
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as dat from 'dat.gui';


function doThreeJS(){
 
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  //Color fondo
  scene.background = new THREE.Color(0.25,0.6,0.95);

  //Luz ambiental
  const ambientLight = new THREE.AmbientLight(0xe0e0e0,1);
  scene.add(ambientLight);
  
  //Luz direccional
  // const light = new THREE.DirectionalLight(0xffffff,0.6);
  // light.position.set(0,4,2);
  // scene.add(light);
  // light.castShadow=true;
  // light.shadow.camera.right = 10;
  // light.shadow.camera.left = -10;

  // const lightH = new THREE.DirectionalLightHelper(light,5); //Ese 5 ayuda al tamanio
  // scene.add(lightH); //Mostramos la direccion de la luz

  // const lightS = new THREE.CameraHelper(light.shadow.camera);
  // scene.add(lightS); //Mostramos la camara  //Edit > toggle line comment

  //Luz de 
  const sLight = new THREE.SpotLight('white',1000); //Luz de 1000 candels
  sLight.position.set(-2,18,1);
  sLight.angle = Math.PI/18; 
  sLight.penumbra = 0.5;
  scene.add(sLight);
  sLight.castShadow=true;
  
  const sLightH = new THREE.SpotLightHelper(sLight);
  scene.add(sLightH); //Son los rayitos blancos que son el helper de sLight


  const renderer = new THREE.WebGLRenderer();
  //renderer.toneMapping = THREE.ACESFilmicToneMapping; //opciones aestethic
  //renderer.outputColorSpace = THREE.SRGBColorSpace; //opciones aestethic
  //renderer.setPixelRatio(window.devicePixelRatio); //opciones aestethic
  renderer.setSize( window.innerWidth, window.innerHeight );

  renderer.shadowMap.enabled=true;

  const controls = new OrbitControls( camera, renderer.domElement );

  document.body.appendChild( renderer.domElement );

  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshPhongMaterial( { color: 0xffffff } );  
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );
  cube.castShadow = true;

  
  const cube2g = new THREE.BoxGeometry( 1, 1, 1 );
  const cube2m = new THREE.MeshPhongMaterial( { color: 0xffff00 } );
  
  const arregloCubos: THREE.Object3D<THREE.Object3DEventMap>[] = []



  //Ciclo para crear nuevos cubos
  for(let i = 0; i < 7; i++) {
    const cube2 = new THREE.Mesh( cube2g, cube2m );
    scene.add( cube2 );
    arregloCubos.push(cube2);
    cube2.castShadow = true;

    cube2.position.set(i*2,2,0);
  }

  const planeG = new THREE.PlaneGeometry(20,20,1,1); // Ancho Alto, Segmentos
  const planeM = new THREE.MeshStandardMaterial({
    color:'darkgray', 
    wireframe:false, 
    side: THREE.DoubleSide});

  const plane = new THREE.Mesh(planeG,planeM);
  planeG.rotateX(90 * (Math.PI/180));
  plane.position.y=-5;
  scene.add(plane);
  plane.receiveShadow=true;


  camera.position.z = 5;

  const clock = new THREE.Clock()
  let time;

  const gui = new dat.GUI();
  const options = {
    intensidad: 500,
    angle: (Math.PI/2)/2,
    penumbra: 0.5,
    color: 0xfff00,
    wireframe:false
  }

  gui.add(options,'intensidad', 0, 1000);
  gui.add(options,'angle', 0, Math.PI/2);
  gui.add(options,'penumbra', 0,1);
  gui.add(options,'wireframe',).onChange((e)=>{
 //   cube2.material.wireframe = e;
  })
  gui.addColor(options,'color',).onChange((evento)=>{
   // cube2.material.color.set(evento);
  });

    //Raycaster
  //en Three js cualquier objeto intersectado por el raycast es añadido a la lista
  //setearemos la camara como la fuente y el mouse como el punto final
  //const mousePosition = new THREE.Vector2();
  const mouseClick = new THREE.Vector2();

  window.addEventListener('click', function(e){
    //obtenemos las coordenadas normalizadas (de -1 a 1)    
    // mouseClick.x =  ( e.clientX / window.innerWidth ) * 2 - 1;
    // mouseClick.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    cube.attach(arregloCubos[0]); 
  })

  const rayCaster = new THREE.Raycaster();
  let loaded = false
  setTimeout(()=>{
    loaded = true;
    //cube.attach(cube2); //Al cubo gris le anado de hijo el cubo2 (el amarillo)
  },1000)

  //cube2.name = "Cubo2";
  //const cubeId = cube2.id;

  function animate() {
    requestAnimationFrame( animate );

    cube.position.z=5;
    time = clock.getElapsedTime();

    cube.position.set(Math.sin(time) * 10,0,0);
    sLight.angle = options.angle;
    sLight.penumbra = options.penumbra;
    sLight.intensity = options.intensidad;
    sLightH.update();

    // if(loaded){
    //   rayCaster.setFromCamera(mousePosition,camera);
    //   const intersectedObjects = rayCaster.intersectObjects(scene.children)
    //   console.log(intersectedObjects);
    //   for (let i = 0; i < intersectedObjects.length; i++){
    //     //if(intersectedObjects[i].object.name=== "Cubo2"){
    //     if(intersectedObjects[i].object.id=== cubeId){
    //       console.log("UwU",i);
    //       console.log(cube2.parent);
    //       //scene.add() //Se vuelve a hacer hijo de la escena pero mantiene la transformacion relativa del padre
    //       //cube2.removeFromParent() //Borra el vinculo al objeto y a la escena
    //       scene.attach(cube2); //Reanadimos a l aescena con su transform
    //     }
    //   }
    // }


    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    // required if controls.enableDamping or controls.autoRotate are set to true
	  controls.update();
    renderer.render( scene, camera );
  }


  window.addEventListener( 'resize', onWindowResize, false );
  
  function onWindowResize(){ //funcion para redimensionar ventana si el usuario le anda moviendo
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
  }
  
  animate(); //Iniciamos el loop
}


const App = () => {

  return (
    <>
      {/* <div id="info">Buenas</div> */}
      {doThreeJS()}
    </>
  )
}

export default App

