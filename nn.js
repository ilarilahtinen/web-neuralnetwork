// eslint-disable-next-line no-unused-vars
class NeuralNet {
  constructor (input, hidden, output) {
    this.input = input
    this.hidden = hidden
    this.output = output
    this.dx = 0
    this.dy = 0
    this.scale = 1
    this.lr = 0.001
    // eslint-disable-next-line no-undef
    this.inTohid = new Matrix(input, hidden)
    // eslint-disable-next-line no-undef
    this.hidToout = new Matrix(hidden, output)
    // eslint-disable-next-line no-undef
    this.hidBias = new Matrix(1, hidden)
    this.hidBias.map(item => 1)
    // eslint-disable-next-line no-undef
    this.outBias = new Matrix(1, output)
    this.outBias.map(item => 1)
    this.inTohid.randomize()
    this.hidToout.randomize()
    this.inputLayer = null
    this.midLayer = null
    this.outputLayer = null
    this.result = null
  }
  move (x, y, ctx) {
    ctx.clearRect(0, 0, 600, 600)
    this.dx += x
    this.dy += y
    this.draw(ctx)
  }
  resize (n, ctx) {
    ctx.clearRect(0, 0, 600, 600)
    this.scale += n
    this.draw(ctx)
  }
  predict (input) {
    // eslint-disable-next-line no-undef
    this.inputLayer = Matrix.arrayToMatrix(input)
    // eslint-disable-next-line no-undef
    this.midLayer = Matrix.mult(this.inputLayer, this.inTohid)
    // eslint-disable-next-line no-undef
    this.midLayer = Matrix.add(this.midLayer, this.hidBias)
    this.midLayer.map(sigmoid)
    // eslint-disable-next-line no-undef
    this.outputLayer = Matrix.mult(this.midLayer, this.hidToout)
    // eslint-disable-next-line no-undef
    this.outputLayer = Matrix.add(this.outputLayer, this.outBias)
    this.outputLayer.map(sigmoid)
    return this.outputLayer
  }
  correct (input, output) {
    let guess = this.predict(input)
    //  eslint-disable-next-line no-undef
    let y = Matrix.arrayToMatrix(output)
    //  eslint-disable-next-line no-undef
    let dError = Matrix.multiply(guess.clone(), Matrix.sub(y, guess.clone()))
    dError.map((item) => {
      return -1.0 * item
    })
    let out = guess.clone()
    out.map(item => sigmoid(item) * (1 - sigmoid(item)))
    //  eslint-disable-next-line no-undef
    let outErr = Matrix.multiply(dError, out)
    let dOutBias = outErr.clone()
    // eslint-disable-next-line no-undef
    let dHidden = Matrix.mult(outErr, this.midLayer)
    // eslint-disable-next-line no-undef
    let eTotal = Matrix.mult(outErr, Matrix.transpose(this.hidToout))
    let hid = this.midLayer.clone()
    hid.map(item => sigmoid(item) * (1 - sigmoid(item)))
    // eslint-disable-next-line no-undef
    let dInput = Matrix.mult(Matrix.transpose(this.inputLayer), Matrix.multiply(hid, eTotal))
    // eslint-disable-next-line no-undef
    let dHidBias = Matrix.multiply(hid, eTotal).clone()
    dHidden.map(item => item * this.lr)
    dInput.map(item => item * this.lr)
    dOutBias.map(item => item * this.lr)
    dHidBias.map(item => item * this.lr)
    // eslint-disable-next-line no-undef
    this.hidToout = Matrix.sub(this.hidToout, Matrix.transpose(dHidden))
    // eslint-disable-next-line no-undef
    this.inTohid = Matrix.sub(this.inTohid, dInput)
    // eslint-disable-next-line no-undef
    this.hidBias = Matrix.sub(this.hidBias, dHidBias)
    // eslint-disable-next-line no-undef
    this.outBias = Matrix.sub(this.outBias, dOutBias)
  }

  draw (ctx) {
    ctx.textAlign = 'center'
    let inStart = 150 - (this.input * 30 / 2) * this.scale + this.dy
    let inhid = 150 - (this.hidden * 30 / 2) * this.scale + this.dy
    let inout = 150 - (this.output * 30 / 2) * this.scale + this.dy
    for (let i = 0; i < this.input; i++) {
      ctx.beginPath()
      ctx.rect(10 * this.scale + this.dx, inStart + 30 * this.scale * i, 20 * this.scale, 20 * this.scale)
      ctx.strokeStyle = 'black'
      ctx.stroke()
      if (this.inputLayer) {
        ctx.fillStyle = 'black'
        ctx.fillText(this.inputLayer.data[0][i], 10 * this.scale + this.dx, inStart + 30 * this.scale * i)
        ctx.fillRect(10 * this.scale + this.dx, inStart + 30 * this.scale * i, 20 * this.scale, 20 * this.scale * (1 - this.inputLayer.data[0][i]))
        ctx.fillStyle = 'white'
      }
      for (let j = 0; j < this.hidden; j++) {
        if (this.inTohid.data[i][j] > 0) {
          ctx.strokeStyle = 'green'
        } else {
          ctx.strokeStyle = 'red'
        }
        ctx.beginPath()
        ctx.moveTo(30 * this.scale + this.dx, inStart + 30 * i * this.scale + 10)
        ctx.lineTo(160 * this.scale + this.dx, inhid + 30 * j * this.scale + 10)
        ctx.stroke()
        ctx.fillStyle = 'black'
        ctx.fillText(Math.floor(100 * this.inTohid.data[i][j]) / 100, 129 * this.scale + this.dx, (inStart + 30 * i * this.scale) / 4 + (3 / 4) * (inhid + 30 * j * this.scale + 10))
        ctx.fillStyle = 'white'
      }
    }

    for (let i = 0; i < this.hidden; i++) {
      ctx.beginPath()
      ctx.rect(160 * this.scale + this.dx, inhid + 30 * this.scale * i, 20 * this.scale, 20 * this.scale)
      ctx.strokeStyle = 'black'
      ctx.stroke()
      if (this.midLayer) {
        ctx.fillStyle = 'black'
        ctx.fillRect(160 * this.scale + this.dx, inhid + 30 * this.scale * i + 20 * this.scale * this.midLayer.data[0][i], 20 * this.scale, 20 * this.scale * (1 - this.midLayer.data[0][i]))
        ctx.fillStyle = 'white'
      }
      for (let j = 0; j < this.output; j++) {
        ctx.strokeStyle = 'green'
        if (this.hidToout.data[i][j] > 0) {
          ctx.strokeStyle = 'green'
        } else {
          ctx.strokeStyle = 'red'
        }
        ctx.beginPath()
        ctx.moveTo(180 * this.scale + this.dx, inhid + 30 * i * this.scale + 10)
        ctx.lineTo(310 * this.scale + this.dx, inout + 30 * j * this.scale + 10)
        ctx.stroke()
        ctx.fillStyle = 'black'
        ctx.fillText(Math.floor(100 * this.hidToout.data[i][j]) / 100, 245 * this.scale + this.dx, (inhid + inout) / 2 + 15 * (i + j) * this.scale + 10)
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.rect(310 * this.scale + this.dx, inout + 30 * j * this.scale, 20 * this.scale, 20 * this.scale)
        ctx.strokeStyle = 'black'
        ctx.stroke()
        if (this.outputLayer) {
          ctx.fillStyle = 'black'
          ctx.fillRect(310 * this.scale + this.dx, inout + 30 * j * this.scale + 20 * this.scale * this.outputLayer.data[0][j], 20 * this.scale, 20 * this.scale * (1 - this.outputLayer.data[0][j]))
          ctx.fillStyle = 'white'
        }
      }
    }
  }
}
function sigmoid (item) {
  let result = 1 / (Math.pow(Math.E, -item) + 1)
  return result
}
