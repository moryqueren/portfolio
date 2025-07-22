function revealFunction() {
    window.sr = ScrollReveal({duration: 1350, distance: '250px', 
        easing: 'ease-out'
    })

    sr.reveal('.reveal-left', {origin: 'left', reset: true})
    sr.reveal('.reveal-top', {origin: 'top', reset: true})
    sr.reveal('.reveal-bottom', {origin: 'bottom', reset: true})
    sr.reveal('.reveal-right', {origin: 'right', reset: true})
}


window.addEventListener('load', () => {
    revealFunction();
});

const lineBottom = document.querySelectorAll("nav a");
for(let line of lineBottom) {
    line.addEventListener("mouseover", (x) => 
    {
        x.preventDefault();
        line.style.borderBottom = "1px solid #fff"
    });
    line.addEventListener("mouseout", (x) =>
    {
        x.preventDefault();
        line.style.borderBottom = 'none';
    });
}