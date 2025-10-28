let scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(10,10,10);

let renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = false;
controls.enableZoom = false;
controls.target.set(0,0,0);

// Luzes
let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 20, 10);
scene.add(directionalLight);
scene.add(new THREE.AmbientLight(0x404040));

// Chão
let floor = new THREE.Mesh(
    new THREE.PlaneGeometry(50,50),
    new THREE.MeshStandardMaterial({color:0x228B22})
);
floor.rotation.x = -Math.PI/2;
scene.add(floor);

// Player
let player;
const loader = new THREE.GLTFLoader();
loader.load('assets/player.glb', function(gltf){
    player = gltf.scene;
    player.position.set(0,0,0);
    scene.add(player);
});

// Inimigo
let enemy;
loader.load('assets/enemy.glb', function(gltf){
    enemy = gltf.scene;
    enemy.position.set(5,0,5);
    scene.add(enemy);
});

// Itens colecionáveis
let collectibles = [];
loader.load('assets/collectible.glb', function(gltf){
    for(let i=0;i<5;i++){
        let item = gltf.scene.clone();
        item.position.set(Math.random()*20-10,0,Math.random()*20-10);
        scene.add(item);
        collectibles.push(item);
    }
});

let move = {up:false,down:false,left:false,right:false};
['up','down','left','right'].forEach(dir=>{
  let btn = document.getElementById(dir);
  btn.addEventListener('touchstart',()=>move[dir]=true);
  btn.addEventListener('touchend',()=>move[dir]=false);
});

function animate(){
    requestAnimationFrame(animate);

    if(player){
        let speed = 0.1;
        if(move.up) player.position.z -= speed;
        if(move.down) player.position.z += speed;
        if(move.left) player.position.x -= speed;
        if(move.right) player.position.x += speed;
    }

    if(player && enemy){
        let dir = new THREE.Vector3();
        dir.subVectors(player.position, enemy.position).normalize();
        enemy.position.addScaledVector(dir, 0.02);
    }

    // Coleta de itens
    if(player){
        for(let i=collectibles.length-1;i>=0;i--){
            if(player.position.distanceTo(collectibles[i].position)<0.5){
                scene.remove(collectibles[i]);
                collectibles.splice(i,1);
                document.getElementById('score').innerText = "Pontuação: " + (5-collectibles.length);
            }
        }
    }

    if(player) controls.target.copy(player.position);
    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
