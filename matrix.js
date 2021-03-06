// eslint-disable-next-line no-unused-vars
class Matrix {
  constructor (rows, cols) {
    this.rows = rows
    this.cols = cols
    this.data = []
    for (let i = 0; i < rows; i++) {
      let temp = []
      for (let j = 0; j < cols; j++) {
        temp.push(0)
      }
      this.data.push(temp)
    }
  }
  map (func) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = func(this.data[i][j])
      }
    }
  }
  clone () {
    let result = new Matrix(this.rows, this.cols)
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        result.data[i][j] = this.data[i][j]
      }
    }
    return result
  }
  randomize () {
    this.map((it) => (Math.random() * 2) - 1)
  }
  static arrayToMatrix (arr) {
    let rows = arr.length
    let cols = arr[0].length
    if (!cols) {
      cols = rows
      rows = 1
      arr = [arr]
    }
    let mat = new Matrix(rows, cols)
    mat.data = arr
    return mat
  }
  static transpose (matrix) {
    let result = new Matrix(matrix.cols, matrix.rows)
    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.cols; j++) {
        result.data[i][j] = matrix.data[j][i]
      }
    }
    return result
  }
  toArr () {
    if (this.rows === 1) {
      return this.data[0]
    }
    return this.data
  }
  static sub (a, b) {
    if (a.rows !== b.rows || a.cols !== b.cols) {
      console.log('No matching cols and rows')
      console.log('a rows:' + a.rows)
      console.log('b rows:' + b.rows)
      console.log('a cols:' + a.cols)
      console.log('b cols:' + b.cols)
      return null
    }
    let result = new Matrix(a.rows, b.cols)
    for (let i = 0; i < a.rows; i++) {
      for (let j = 0; j < b.cols; j++) {
        result.data[i][j] = a.data[i][j] - b.data[i][j]
      }
    }
    return result
  }
  static add (a, b) {
    if (a.rows !== b.rows || a.cols !== b.cols) {
      console.log('No matching cols and rows')
      console.log('a rows:' + a.rows)
      console.log('b rows:' + b.rows)
      console.log('a cols:' + a.cols)
      console.log('b cols:' + b.cols)
      return null
    }
    let result = new Matrix(a.rows, b.cols)
    for (let i = 0; i < a.rows; i++) {
      for (let j = 0; j < b.cols; j++) {
        result.data[i][j] = a.data[i][j] + b.data[i][j]
      }
    }
    return result
  }
  static multiply (a, b) {
    let result = new Matrix(a.rows, b.cols)
    for (let i = 0; i < a.rows; i++) {
      for (let j = 0; j < b.cols; j++) {
        result.data[i][j] = a.data[i][j] * b.data[i][j]
      }
    }
    return result
  }
  static mult (a, b) {
    if (a.cols !== b.rows) {
      console.log('Your matrices are not right sized to be multiplied')
      console.log(a.cols + '!=' + b.rows)
      return
    }
    let result = new Matrix(a.rows, b.cols)
    for (let i = 0; i < a.rows; i++) {
      for (let j = 0; j < b.cols; j++) {
        var sum = 0
        for (let t = 0; t < a.cols; t++) {
          let aFactor
          let bFactor
          aFactor = a.data[i][t]
          bFactor = b.data[t][j]
          sum += aFactor * bFactor
        }
        result.data[i][j] = sum
      }
    }
    return result
  }
}
