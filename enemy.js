// IA simples para inimigo
function updateEnemy(){
    if(!enemy || !player) return;

    let speed = 0.02;
    let direction = new THREE.Vector3();
    direction.subVectors(player.position, enemy.position).normalize();
    enemy.position.addScaledVector(direction, speed);
}

// Integrar com main.js
function animateEnemy(){
    updateEnemy();
    requestAnimationFrame(animateEnemy);
}
animateEnemy();
