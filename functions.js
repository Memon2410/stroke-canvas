document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const strokes = {}
  let strokeIndex = 0
  const strokesNum = 12
  let posStrokeX = 0
  let strokeAnimation = null

  function Stroke () {
    posStrokeX += canvas.width / 1000
    strokeIndex++
    strokes[strokeIndex] = this
    this.id = strokeIndex
    this.viewed = 0
    this.maxViewed = 3
    this.color = 'rgba(255, 0, 0, 1)'
  }

  Stroke.prototype.draw = function () {
    this.viewed++
    if (this.viewed >= this.maxViewed) {
      delete strokes[this.id]
    }
    if (posStrokeX >= canvas.width) {
      window.cancelAnimationFrame(strokeAnimation)
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.fillStyle = '#000000'
      context.fillRect(0, 0, canvas.width, canvas.height)
    }
    context.fillStyle = this.color
    context.fillRect(posStrokeX, 0, 3, canvas.height)
  }

  const animate = () => {
    strokeAnimation = requestAnimationFrame(animate)
    context.fillStyle = 'rgba(0, 0, 0, 0.9)'
    context.fillRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < strokesNum; i++) {
      new Stroke()
    }

    for (let i in strokes) {
      strokes[i].draw()
    }
  }

  const initStroke = () => {
    canvas.style.width = window.innerWidth + 'px'
    canvas.style.height = window.innerHeight + 'px'

    canvas.width = window.innerWidth * window.devicePixelRatio
    canvas.height = window.innerHeight * window.devicePixelRatio

    document.body.appendChild(canvas)
    context.fillStyle = '#000000'
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  initStroke()
  animate()
})
