let canvas=document.getElementById('canvas')
let ctx=canvas.getContext("2d");
let nn=new neuralNet(2,10,1);
nn.draw(ctx)
nn.predict([1,2])
