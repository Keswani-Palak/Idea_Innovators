function generateRecommendation() {
    const input = document.getElementById("aiInput").value.trim().toLowerCase();
    const output = document.getElementById("aiOutput");

    if (!input) {
        output.innerText = "Please enter a keyword or phrase to get a recommendation.";
        return;
    }

    if (input.includes("competitive")) {
        output.innerText = "🔥 Try Call of Duty or FIFA for ranked competitive gameplay.";
    } else if (input.includes("story")) {
        output.innerText = "🎬 Try God of War or Spider-Man for immersive storytelling.";
    } else {
        output.innerText = "🎮 Based on your profile, Spider-Man Remastered is a great choice!";
    }
}

// page-level animations & parallax effects
function initPageEffects(){
    const xp = document.getElementById('xpProgress');
    if(xp){
        xp.style.width = '0';
        requestAnimationFrame(()=> xp.style.width = xp.getAttribute('data-pct') || '45%');
    }

    const hero = document.querySelector('.hero');
    if(hero){
        hero.addEventListener('mousemove', e=>{
            const r = hero.getBoundingClientRect();
            const x = (e.clientX - (r.left + r.width/2)) / r.width;
            const y = (e.clientY - (r.top + r.height/2)) / r.height;
            hero.style.transform = `perspective(600px) rotateX(${y*4}deg) rotateY(${x*4}deg)`;
            hero.style.backgroundPosition = `${50 + x*8}% ${50 + y*8}%`;
        });
        hero.addEventListener('mouseleave', ()=>{
            hero.style.transform='perspective(600px) rotateX(0) rotateY(0)';
            hero.style.backgroundPosition='50% 50%';
        });
    }
}

document.addEventListener('DOMContentLoaded', initPageEffects);
