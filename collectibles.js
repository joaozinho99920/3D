// Atualiza itens colecionáveis
function updateCollectibles(){
    if(!player) return;
    for(let i=collectibles.length-1;i>=0;i--){
        if(player.position.distanceTo(collectibles[i].position) < 0.5){
            scene.remove(collectibles[i]);
            collectibles.splice(i,1);
            document.getElementById('score').innerText = "Pontuação: " + (5 - collectibles.length);
        }
    }
}

// Integrar com main.js
function animateCollectibles(){
    updateCollectibles();
    requestAnimationFrame(animateCollectibles);
}
animateCollectibles();
