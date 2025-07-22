document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("background-canvas")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  if (!ctx) return

  let animationFrameId = null
  const particles = []
  const numParticles = 80 // Nombre de particules
  const maxDistance = 120 // Distance max pour les lignes
  const particleSpeed = 0.3 // Vitesse des particules

  function createParticles(width, height) {
    particles.length = 0 // Vider le tableau existant
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * particleSpeed,
        vy: (Math.random() - 0.5) * particleSpeed,
        radius: Math.random() * 1.5 + 0.5, // Rayon variant
      })
    }
  }

  function draw() {
    const { width, height } = canvas
    ctx.clearRect(0, 0, width, height) // Effacer le canevas

    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i]

      // Mettre à jour la position
      p1.x += p1.vx
      p1.y += p1.vy

      // Rebondir sur les murs
      if (p1.x < 0 || p1.x > width) p1.vx *= -1
      if (p1.y < 0 || p1.y > height) p1.vy *= -1

      // Dessiner la particule
      ctx.beginPath()
      ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)" // Particules blanches
      ctx.fill()

      // Dessiner des lignes vers d'autres particules
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j]
        const distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))

        if (distance < maxDistance) {
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxDistance})` // Lignes estompées
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }
    animationFrameId = requestAnimationFrame(draw)
  }

  const setCanvasDimensions = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    createParticles(canvas.width, canvas.height) // Recréer les particules au redimensionnement
  }

  setCanvasDimensions() // Configuration initiale
  window.addEventListener("resize", setCanvasDimensions)

  createParticles(canvas.width, canvas.height)
  animationFrameId = requestAnimationFrame(draw)

  // Nettoyage à la sortie (non strictement nécessaire pour un fichier HTML simple, mais bonne pratique)
  window.addEventListener("beforeunload", () => {
    window.removeEventListener("resize", setCanvasDimensions)
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }
  })
})
