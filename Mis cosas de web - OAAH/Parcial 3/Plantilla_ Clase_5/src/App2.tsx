import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';

function doThreeJS(){
 
  const dances = ['Happy','HipHop','Macarena','Samba'];

  let nModels = 20;
  let waitTimer=1;  

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  //Color fondo
  scene.background = new THREE.Color(0.4,0.5,0.9); 

  //Luz direccional
  const light = new THREE.DirectionalLight(0xffffff,1);
  light.position.set(0,4,2);
  scene.add(light);
  light.castShadow=true;
  
  //Luz ambiental
  const ambientLight = new THREE.AmbientLight(0xbbccff,1.2);
  scene.add(ambientLight);


  const renderer = new THREE.WebGLRenderer();
  renderer.toneMapping = THREE.ACESFilmicToneMapping; //opciones aestethic
  renderer.outputColorSpace = THREE.SRGBColorSpace; //opciones aestethic
  renderer.setPixelRatio(window.devicePixelRatio); //opciones aestethic
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMap.enabled = true;

  const clock = new THREE.Clock();

  const controls = new OrbitControls( camera, renderer.domElement );

  document.body.appendChild( renderer.domElement );

  let model: THREE.AnimationObjectGroup | any;
  let clips: THREE.AnimationClip[] =[];
  let mixer: THREE.AnimationMixer | null;


  const loader = new GLTFLoader();
  loader.load( 'models/robot.gltf', function ( gltf ) {

    model = gltf.scene;
    scene.add( model );

    model.traverse((modelito:any)=>{
      if(modelito.isMesh){
        modelito.castShadow=true;
      }
    });

    clips=gltf.animations;

  }, undefined, function ( e ) {

    console.error( e );

  } );

  camera.position.z = 15;
  camera.position.y = 5;

  const planeGeo = new THREE.PlaneGeometry(20,20,1,1);
  const planeMat = new THREE.MeshPhongMaterial({color:0x336699});
  const plane = new THREE.Mesh(planeGeo,planeMat);
  scene.add(plane);
  plane.rotateX(-90*(Math.PI/180));
  plane.receiveShadow=true;

  const mixers: THREE.AnimationMixer[]=[];

  function animate() {
    requestAnimationFrame( animate );
    const delta = clock.getDelta();    

    waitTimer -= delta;
    if(nModels > 0 && waitTimer <= 0){
      //cargar modelo nuevo
      nModels--;
      waitTimer = 0.5;
      const modelClone = SkeletonUtils.clone(model); //Reutilizar materiales y geometrias del modelo
      modelClone.position.set(
        Math.random()*14-7,
        0,
        Math.random()*14-7);
        modelClone.rotateY(Math.random()*(Math.PI*2))
        scene.add(modelClone);
        
        const nDance = Math.floor(Math.random() * 4)//Asignar indices de baile entre 0 y 3
        const mixer = new THREE.AnimationMixer(modelClone);
        const clip = THREE.AnimationClip.findByName(clips, dances[nDance]);
        const action = mixer.clipAction(clip);
        action.play();
        mixers.push(mixer); //Guardar este mixer en el arreglo
    }
    
    if(mixers.length>0){
      mixers.forEach(function(mixer){
        mixer.update(delta);
      })
    }

    controls.update()
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


const App2 = () => {

  return (
    <>
      {doThreeJS()}
    </>
  )
}

export default App2