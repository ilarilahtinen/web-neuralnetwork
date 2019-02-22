let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
canvas.addEventListener('click', addTick)
window.addEventListener('keydown', check, false)

function check (e) {
  if (e.keyCode === 32) {
    turn++
  }
  if (e.keyCode === 13) {
    round()
  }
}

let t = 0
let turn = 0
let test = []
function addTick (e) {
  e.preventDefault()
  let x = e.clientX
  let y = e.clientY
  if (x < 600 && x > 500 && y > 500 && y < 600) {
    test.push({ in: [(x - 500) / 100, (y - 500) / 100], out: [turn % 2] })
  }
  draw(ctx)
}
function round () {
  if (test.length > 0) {
    for (let i = 0; i < 100; i++) {
      t = Math.floor(Math.random() * test.length)
      nn.correct(test[t].in, test[t].out)
    }
  }

  draw(ctx)
  // if (test.length > 0 && Math.abs(nn.predict(test[t].in).data[0][0] - test[t].out[0]) < 0.02) {
  //   console.log('stop')
  // } else {
  //   t++
  window.requestAnimationFrame(round)
  // }
}
// eslint-disable-next-line no-undef
let nn = new NeuralNet(2, 30, 1)
draw(ctx)
function draw (ctx) {
  ctx.clearRect(0, 0, 600, 600)
  ctx.beginPath()
  ctx.rect(0, 0, 600, 600)
  ctx.rect(500, 500, 100, 100)
  ctx.strokeStyle = 'black'
  ctx.stroke()
  for (let r = 0; r < 100; r += 5) {
    for (let k = 0; k < 100; k += 5) {
      if (nn.outputLayer) {
        let val = nn.predict([r / 100, k / 100]).data[0][0]
        // if (val < 0.5) {
        //   ctx.fillStyle = 'red'
        // } else {
        //   ctx.fillStyle = 'blue'
        // }
        ctx.fillStyle = 'hsl(' + 360 * val + ', 50%, 25%)'
        ctx.fillRect(500 + r, 500 + k, 5, 5)
      }
    }
  }
  for (let v = 0; v < test.length; v++) {
    if (test[v].out[0] === 1) {
      ctx.fillStyle = 'yellow'
    } else {
      ctx.fillStyle = 'black'
    }
    ctx.fillRect(test[v].in[0] * 100 + 500, test[v].in[1] * 100 + 500, 5, 5)
  }
  nn.draw(ctx)
}
// round()
window.onkeyup = (e) => {
  switch (e.key) {
    case 'ArrowDown':
      nn.move(0, 5, ctx)
      break
    case 'ArrowUp':
      nn.move(0, -5, ctx)
      break
    case 'ArrowLeft':
      nn.move(-5, 0, ctx)
      break
    case 'ArrowRight':
      nn.move(5, 0, ctx)
      break
    case 'w':
      nn.resize(-0.1, ctx)
      break
    case 'e':
      nn.resize(0.1, ctx)
      break
  }
}
