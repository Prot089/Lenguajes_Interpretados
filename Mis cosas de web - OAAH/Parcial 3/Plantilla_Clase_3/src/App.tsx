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

  //CUBO DINAMICO
  const cuboGeo = new THREE.BoxGeometry(2,2,2);
  const cuboMat = new THREE.MeshPhongMaterial({
    color: 0x77bbee,
    wireframe: false
  });
  const cuboMesh = new THREE.Mesh(cuboGeo,cuboMat);
  scene.add(cuboMesh);
  cuboMesh.castShadow=true;

  cuboMesh.position.set(2,15,0);
  const cuboPhysM = new CANNON.Material("cuboMatPhys");

  const cuboBody = new CANNON.Body({
    mass:1,
    shape: new CANNON.Box(new CANNON.Vec3(1,1,1)),
    position: new CANNON.Vec3(2,15,0),
    type: CANNON.Body.DYNAMIC,
    material: cuboPhysM
  })
  

  world.addBody(cuboBody);
  cuboBody.angularVelocity.set(0,15,0);
  //cuboBody.angularDamping=0.8;
  cuboBody.addEventListener("Collide", (e:any)=>{
    console.log("Contacto ", e.contact);
    console.log("Choque con: ", e.body.id, " y yo soy", e.target.id)
  })

  const pisoCuboContact = new CANNON.ContactMaterial(
    planoPhysM, 
    cuboPhysM,{
      //friction:0,
      restitution:1
  })

  world.addContactMaterial(pisoCuboContact)

  const esferaGeo = new THREE.SphereGeometry(2);
  const esferaMat = new THREE.MeshPhongMaterial({
    color: 0xeebb77,
    wireframe: false
  });
  const esfeMesh = new THREE.Mesh(esferaGeo,esferaMat);
  scene.add(esfeMesh);
  esfeMesh.castShadow=true;
  //esfeMesh.position.set(0,5,0);

  const esferaBody = new CANNON.Body({
    shape: new CANNON.Sphere(2),
    position: new CANNON.Vec3(0,5,0),
    type: CANNON.Body.KINEMATIC
  })

  esferaBody.velocity.set(1,0,0);
  world.addBody(esferaBody);
  esferaBody.collisionResponse = false; //Trigger

  const physStep = 1 / 60; //la documentacion recomienda usar este valor
  const clock = new THREE.Clock();

  function animate() {

    world.step(physStep);

    cuboMesh.position.copy(cuboBody.position)
    cuboMesh.quaternion.copy(cuboBody.quaternion)

    planoMesh.position.copy(planoBody.position);
    planoMesh.quaternion.copy(planoBody.quaternion);


    esfeMesh.position.copy(esferaBody.position);
    esfeMesh.quaternion.copy(esferaBody.quaternion);

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

const App = () => {
  return (
    <>      
    {doThree()}
    </>
  )
}

export default App