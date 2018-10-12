let canvas=document.getElementById('canvas')
let ctx=canvas.getContext("2d");
let nn=new neuralNet(2,10,1);
nn.draw(ctx)
nn.predict([1,2])
window.onkeyup = (e)=>{
  
  switch(e.key){
    case "ArrowDown":
      nn.move(0,5,ctx);
      break
    case "ArrowUp":
      nn.move(0,-5,ctx);
      break
    case "ArrowLeft":
      nn.move(-5,0,ctx);
      break
    case "ArrowRight":
      nn.move(5,0,ctx);
      break
    case "w":
      nn.resize(-0.1,ctx);
      break
    case "e":
      nn.resize(0.1,ctx);
      break
  }
}
