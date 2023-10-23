import * as THREE from 'three';
import * as CANNON from 'cannon';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

//THREE JS que nos permite rendereizar
//Cannon collsiones; position; velocity.velocity, material
//

function doThree(){
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  camera.position.z = 15;
  camera.position.y = 3;  

  //Color fondo
  scene.background = new THREE.Color( 'lightgreen' );

  //Luz direccional
  const light = new THREE.DirectionalLight(0xffffff,0.6);
  light.position.set(-1,4,2);
  scene.add(light);
  light.castShadow=true;
  
  //Luz ambiental
  const ambientLight = new THREE.AmbientLight(0x99aaff,1);
  scene.add(ambientLight);

  const renderer = new THREE.WebGLRenderer();
  renderer.toneMapping = THREE.ACESFilmicToneMapping; //opciones aestethic
  renderer.outputColorSpace = THREE.SRGBColorSpace; //opciones aestethic
  renderer.setPixelRatio(window.devicePixelRatio); //opciones aestethic
  renderer.setSize( window.innerWidth, window.innerHeight );

  renderer.shadowMap.enabled = true;

  const controls = new OrbitControls( camera, renderer.domElement );
  controls.update();

  document.body.appendChild( renderer.domElement );

  const world = new CANNON.World(); // Inicializando mundo de fisicas
  world.gravity = new CANNON.Vec3(0,-9.81,0);


  const planoGeometry = new THREE.PlaneGeometry(25,25,5,5);
  const planoMaterial = new THREE.MeshPhongMaterial({
    color:0x339944,       
    side:THREE.DoubleSide
  });
  const planoMesh = new THREE.Mesh(planoGeometry,planoMaterial);
  //planoMesh.rotateX(-90 * (Math.PI/180))
  
  scene.add(planoMesh);  
  planoMesh.receiveShadow = true; 

  const planoPhysM = new CANNON.Material("Bouncing");

  const planoBody:any = new CANNON.Body({
    //shape: new CANNON.Plane() //Es infinito
    shape: new CANNON.Box(new CANNON.Vec3(12.5,12.5,0.1)),
    type: CANNON.Body.STATIC,
    material: planoPhysM
  })


  world.addBody(planoBody);
  planoBody.quaternion.setFromEuler(-90 * (Math.PI/180),0,0);

  const arregloEsferasM: { position: { copy: (arg0: any) => void; }; }[] | THREE.Mesh<THREE.SphereGeometry, THREE.MeshPhongMaterial, THREE.Object3DEventMap>[] = []
  const arregloEsferasB: { position: any; }[] = []


  
  //esferaBody.collisionResponse = false; //Trigger

  const physStep = 1 / 60; //la documentacion recomienda usar este valor
  const clock = new THREE.Clock();

  function crearEsfera(){
    const esferaGeo = new THREE.SphereGeometry(2);
    const esferaMat = new THREE.MeshPhongMaterial({
      color: 0xeebb77,
      wireframe: false
    });
    const esfeMesh = new THREE.Mesh(esferaGeo,esferaMat);
    esfeMesh.castShadow=true;
    //esfeMesh.position.set(0,5,0);

    const esferaBody = new CANNON.Body({
      mass:1,
      shape: new CANNON.Sphere(2),
      position: new CANNON.Vec3(0,5,0),
      type: CANNON.Body.DYNAMIC
    })

    esferaBody.velocity.set(1,20,0);
    world.addBody(esferaBody);
    arregloEsferasB.push(esferaBody);
    scene.add(esfeMesh);
    arregloEsferasM.push(esfeMesh);
  }

  crearEsfera();

  function animate() {

    world.step(physStep);

    planoMesh.position.copy(planoBody.position);
    planoMesh.quaternion.copy(planoBody.quaternion);

    for (let index = 0; index < arregloEsferasM.length; index++) {
     arregloEsferasM[index].position.copy(arregloEsferasB[index].position);
    }

    controls.update();
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
  }
  window.addEventListener( 'resize', onWindowResize, false );
  
  function onWindowResize(){ //funcion para redimensionar ventana si el usuario le anda moviendo
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    controls.update();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  animate();
}

const App2 = () => {
  return (
    <>      
    {doThree()}
    </>
  )
}

export default App2