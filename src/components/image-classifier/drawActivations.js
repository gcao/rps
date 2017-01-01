// Copied from convnetjs images-demo.js
// A is the Vol() to use
// scale is a multiplier to make the visualizations larger. Make higher for larger pictures
// if grads is true then gradients are used instead
export default function drawActivations(A, scale, grads) {

  var s = scale || 2; // scale
  var draw_grads = false;
  if(typeof(grads) !== 'undefined') draw_grads = grads;

  // get max and min activation to scale the maps automatically
  var w = draw_grads ? A.dw : A.w;
  var mm = convnetjs.maxmin(w);

  var canv = document.createElement('canvas');
  canv.className = 'actmap';
  var W = A.sx * s;
  var H = A.sy * s;
  canv.width = W;
  canv.height = H;
  var ctx = canv.getContext('2d');
  var g = ctx.createImageData(W, H);

  var images = [];

  // create the canvas elements, draw and add to DOM
  for(var d=0;d<A.depth;d++) {
    for(var x=0;x<A.sx;x++) {
      for(var y=0;y<A.sy;y++) {
        if(draw_grads) {
          var dval = Math.floor((A.get_grad(x,y,d)-mm.minv)/mm.dv*255);
        } else {
          var dval = Math.floor((A.get(x,y,d)-mm.minv)/mm.dv*255);
        }

        for(var dx=0;dx<s;dx++) {
          for(var dy=0;dy<s;dy++) {
            //var pp = ((W * (y*s+dy)) + (dx + x*s)) * 4;
            var pp = ((H * (x*s+dx)) + (dy + y*s)) * 4;
            for(var i=0;i<3;i++) { g.data[pp + i] = dval; } // rgb
            g.data[pp+3] = 255; // alpha channel
          }
        }
      }
    }

    ctx.putImageData(g, 0, 0);
    images.push(canv.toDataURL('image/png'));
  }

  return images;
}

