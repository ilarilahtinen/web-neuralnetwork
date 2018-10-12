class neuralNet{
  constructor(input,hidden,output){
    this.input=input;
    this.hidden=hidden;
    this.output=output;
    this.dx=0;
    this.dy=0;
    this.inTohid=new Matrix(input,hidden)
    this.hidToout=new Matrix(hidden,output)
    this.inTohid.randomize()
    this.hidToout.randomize()
  }
  move(x,y,ctx){
    this.dx+=x;
    this.dy+=y;
    this.draw(ctx)
  }
  predict(input){
    let inp=Matrix.arrayToMatrix(input);
    let mid=Matrix.mult(inp, this.inTohid);
    let end=Matrix.mult(mid,this.hidToout)
    return end.toArr()
  }

  draw(ctx){
    ctx.clearRect(0,0,300,300)
    ctx.fillStyle="black"
    let inStart=150-(this.input*30/2)+this.dy;
    let inhid=150-(this.hidden*30/2)+this.dy;
    let inout=150-(this.output*30/2)+this.dy;
    for(let i=0; i<this.input; i++){
      ctx.fillRect(10+this.dx,inStart+30*i,20,20)
      for(let j=0; j<this.hidden; j++){
        if(this.inTohid.data[i][j]>0){
          ctx.strokeStyle="green"
        }
        else{
          ctx.strokeStyle="red"
        }
        ctx.beginPath();
        ctx.moveTo(30+this.dx,inStart+30*i+10);
        ctx.lineTo(60+this.dx,inhid+30*j+10);
        ctx.stroke();

      }
    }

    for(let i=0; i<this.hidden; i++){
      ctx.fillRect(60+this.dx,inhid+30*i,20,20)
      for(let j=0; j<this.output; j++){
        if(this.hidToout.data[i][j]>0){
          ctx.strokeStyle="green"
        }
        else{
          ctx.strokeStyle="red"
        }
        ctx.beginPath();
        ctx.moveTo(80+this.dx,inhid+30*i+10);
        ctx.lineTo(110+this.dx,inout+30*j+10);
        ctx.stroke();
        ctx.fillRect(110+this.dx,inout+30*j,20,20)
      }
    }


  }
}
