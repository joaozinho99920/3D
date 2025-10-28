// Controles adicionais do player (mobile e teclado)
let keys = {};

document.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
document.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

function updatePlayerMovement(){
    if(!player) return;
    let speed = 0.1;

    // Teclado
    if(keys['w']) player.position.z -= speed;
    if(keys['s']) player.position.z += speed;
    if(keys['a']) player.position.x -= speed;
    if(keys['d']) player.position.x += speed;

    // Botões mobile
    if(move.up) player.position.z -= speed;
    if(move.down) player.position.z += speed;
    if(move.left) player.position.x -= speed;
    if(move.right) player.position.x += speed;
}

// Integrar com main.js
function animatePlayer(){
    updatePlayerMovement();
    requestAnimationFrame(animatePlayer);
}
animatePlayer();
