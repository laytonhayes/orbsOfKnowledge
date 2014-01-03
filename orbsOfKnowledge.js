/*  HOME PAGE PARTICLES  */
function danceParticles() {
  var wOffset = 0;
  var hOffset = 0;
  var W = $(window).width() -  wOffset, H = $(window).height() - hOffset;
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame   ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function( callback ){
        window.setTimeout(callback, 1000 / 60);
      };
  })();
  var delay = (function(){
    var timer = 0;
    return function(callback, ms){
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
    };
  })();
  function sizeCanvas() {
    W = $(window).width() -  wOffset, H = $(window).height() - hOffset;
    canvas.width = W;
    canvas.height = H;
    ctx.fillRect(0,0,W,H);
  }
  $(window).resize(function() {
    delay(function(){
      sizeCanvas();
    }, 500);
  });
  
  var canvas = $('#particles')[0];
  var ctx = canvas.getContext('2d');
  sizeCanvas();
  
  var particleCount = 30,
    particles = [],
    minDist = 60;
  
  function paintCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,W,H);
  }
  
  function Particle() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = -1 + Math.random() * 2;
    this.vy = -1 + Math.random() * 2;
    this.radius = 3;
    this.draw = function() {
      ctx.fillStyle = '#82d2e5';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fill();
    };
  }
  for(var i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  function draw() {
    paintCanvas();
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.draw();
    }
    update();
  }
  
  function update() {
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if(p.x + p.radius > W) {
        p.x = p.radius;
      }
      else if(p.x - p.radius < 0) {
        p.x = W - p.radius;
      }
      if(p.y + p.radius > H) {
        p.y = p.radius;
      }
      else if(p.y - p.radius < 0) {
        p.y = H - p.radius;
      }
      for(var j = i + 1; j < particles.length; j++) {
        var p2 = particles[j];
        distance(p, p2);
      }
    }
  }
  
  function distance(p1, p2) {
    var dist;
    var dx = p1.x - p2.x;
    var dy = p1.y - p2.y;
    dist = Math.sqrt(dx*dx + dy*dy);
    if(dist <= minDist) {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(130,210,229,'+ (1.2-dist/minDist) +')';
      ctx.lineWidth=2;
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      ctx.closePath();
      var ax = dx/8000,
        ay = dy/8000;
      p1.vx -= ax;
      p1.vy -= ay;
      p2.vx += ax;
      p2.vy += ay;
      }
  }
  
  function animloop() {
    draw();
    requestAnimFrame(animloop);
  }
  animloop();
}