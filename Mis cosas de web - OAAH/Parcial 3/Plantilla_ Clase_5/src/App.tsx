import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function doThreeJS(){
 
  const dances = ['Happy','HipHop','Macarena','Samba'];
  let previousAction:THREE.AnimationAction, activeAction : THREE.AnimationAction;
  let ndance=0;  

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
        modelito.castShaodw=true;
      }
    });

    clips=gltf.animations;
    mixer = new THREE.AnimationMixer( model ); //El animationMixer sirve para mezclar animaciones

    const clip = THREE.AnimationClip.findByName(clips, dances[ndance]);
    const action = mixer.clipAction(clip);
    activeAction = action;
    action.play();


    model.traverse((child:any)=>{
      if(child.isMesh){
        child.castShadow=true;
      }
    })

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

  function fadeToAction( n:number, duration:number ) {

    const clip = THREE.AnimationClip.findByName(clips, dances[n]);
    const action = mixer!.clipAction(clip);

    previousAction = activeAction;
    activeAction = action;

    if ( previousAction !== activeAction ) {

      previousAction.fadeOut( duration );

    }

    activeAction
      .reset()
      .setEffectiveTimeScale( 1 )
      .setEffectiveWeight( 1 )
      .fadeIn( duration )
      .play();

  }
  
  setInterval(()=>{
    ndance++;
    if(ndance>=4)
    ndance=0;
    
    fadeToAction(ndance, 0.9);
  }, 3000) //Cada 3 segundos porque esta en mini-segundos

  function animate() {
    requestAnimationFrame( animate );
    const delta = clock.getDelta();    
    
    if(mixer!=null){
      mixer.update(delta);
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


const App = () => {

  return (
    <>
      {doThreeJS()}
    </>
  )
}

export default App 