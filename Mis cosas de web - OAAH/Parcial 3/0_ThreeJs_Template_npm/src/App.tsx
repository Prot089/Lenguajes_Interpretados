
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';



function doThreeJS(){
 
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  //Color fondo
  scene.background = new THREE.Color(0.25,0.6,0.95);

  //Luz ambiental
  const ambientLight = new THREE.AmbientLight(0xe0e0e0,1); //Color hexadecimal, intensidad
  scene.add(ambientLight);
  
  //Luz direccional
  const light = new THREE.DirectionalLight(0xffffff,0.6);
  light.position.set(0,4,2);
  scene.add(light);
  


  const renderer = new THREE.WebGLRenderer();
  //renderer.toneMapping = THREE.ACESFilmicToneMapping; //opciones aestethic
  //renderer.outputColorSpace = THREE.SRGBColorSpace; //opciones aestethic
  //renderer.setPixelRatio(window.devicePixelRatio); //opciones aestethic
  renderer.setSize( window.innerWidth, window.innerHeight );

  const controls = new OrbitControls( camera, renderer.domElement );

  document.body.appendChild( renderer.domElement );

  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshPhongMaterial( { color: 0xffffff } );  //Phong Iluminacion difusa
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  //const puntos = [new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,5)];

  const points: THREE.Vector3[] = []

  points.push(new THREE.Vector3(0,0,0))
  points.push(new THREE.Vector3(20,0,0))
  points.push(new THREE.Vector3(0,-20,20))
  points.push(new THREE.Vector3(20,-20,20))
  points.push(new THREE.Vector3(0,0,0))


  camera.position.z = 5;

  const clock = new THREE.Clock()


  const gltfLoader = new GLTFLoader();
  let ship: THREE.Group<THREE.Object3DEventMap>; //Ctrl . para inferir el tipo
  let loaded = false;

    // Load a glTF resource
  gltfLoader.load(
    // resource URL
    'models/spaceship.gltf',
    // called when the resource is loaded
    function ( gltf ) {

      ship = gltf.scene;
      scene.add( gltf.scene );
      loaded=true;

    },
    // called while loading is progressing
    function ( xhr ) {

      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

    },
    // called when loading has errors
    function ( error ) {

      console.log( 'An error happened' );

    }
  );

  //cube.position.set(0,-5,0);  // - 5 metros de altura


  let currentPosition = 0

  function animate() {
    requestAnimationFrame( animate );

    const delta = clock.getDelta(); 
    const time = clock.getElapsedTime();

    //cube.rotation.x += 2 * delta;
    //cube.rotation.y += 2 * delta;

    //cube.position.set(
    //  Math.sin(time)*10,
    //  Math.cos(time)*10,
    //  0);

    if(loaded){
      ship.translateZ(delta * 3);

      //ship.rotateY(delta);
      //ship.translateZ(delta*10);
      ship.lookAt(points[currentPosition]); //Ship va a ver al cubo 
      if(ship.position.distanceTo(points[currentPosition])  < 2){ //Si la distancia entre la nave y el cubo es menor a 2
        currentPosition++; //La variable currentP se incrementa en 1
        if(currentPosition == 4){ // Si la variable currentP es igual a 3 entonces
          currentPosition = 0;
        }
      }
    }

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
      <div id="info">Buenas</div>
      {doThreeJS()}
    </>
  )
}

export default App