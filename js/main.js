function getRandom(min, max){
  return Math.random() * (max - min) + min;
}

var isSafari = /constructor/i.test(window.HTMLElement);
var isFF = !!navigator.userAgent.match(/firefox/i);

if (isSafari) {
  document.getElementsByTagName('html')[0].classList.add('safari');
}

// Remove click on button for demo purpose
Array.prototype.slice.call(document.querySelectorAll('.button'), 0).forEach(function(bt) {
  bt.addEventListener('click', function(e) {
    e.preventDefault();
  });
});

initBt1();
initBt2();
initBt3();
initBt4();
initBt5();
initBt6();
initBt7();
initBt8();
initBt9();
initBt10();

// Button 1
function initBt1() {
  var bt1 = document.querySelectorAll('#component-1')[0];
  var $circlesTopLeft = bt1.querySelectorAll('.circle.top-left');
  var $circlesBottomRight = bt1.querySelectorAll('.circle.bottom-right');

  var tl = new TimelineLite();
  var tl2 = new TimelineLite();

  var btTl = new TimelineLite({ paused: true });

  tl.to($circlesTopLeft, 1.2, { x: -25, y: -25, scaleY: 2, ease: SlowMo.ease.config(0.1, 0.7, false) });
  tl.to($circlesTopLeft[0], 0.1, { scale: 0.2, x: '+=6', y: '-=2' });
  tl.to($circlesTopLeft[1], 0.1, { scaleX: 1, scaleY: 0.8, x: '-=10', y: '-=7' }, '-=0.1');
  tl.to($circlesTopLeft[2], 0.1, { scale: 0.2, x: '-=15', y: '+=6' }, '-=0.1');
  tl.to($circlesTopLeft[0], 1, { scale: 0, x: '-=5', y: '-=15', opacity: 0 });
  tl.to($circlesTopLeft[1], 1, { scaleX: 0.4, scaleY: 0.4, x: '-=10', y: '-=10', opacity: 0 }, '-=1');
  tl.to($circlesTopLeft[2], 1, { scale: 0, x: '-=15', y: '+=5', opacity: 0 }, '-=1');

  var tlBt1 = new TimelineLite();
  var tlBt2 = new TimelineLite();

  tlBt1.set($circlesTopLeft, { x: 0, y: 0, rotation: -45 });
  tlBt1.add(tl);

  tl2.to($circlesBottomRight, 1.2, { x: 25, y: 25, scaleY: 2, ease: SlowMo.ease.config(0.1, 0.7, false) });
  tl2.to($circlesBottomRight[0], 0.1, { scale: 0.2, x: '-=6', y: '+=3' });
  tl2.to($circlesBottomRight[1], 0.1, { scale: 0.8, x: '+=7', y: '+=3' }, '-=0.1');
  tl2.to($circlesBottomRight[2], 0.1, { scale: 0.2, x: '+=15', y: '-=6' }, '-=0.1');
  tl2.to($circlesBottomRight[0], 1, { scale: 0, x: '+=5', y: '+=15', opacity: 0 });
  tl2.to($circlesBottomRight[1], 1, { scale: 0.4, x: '+=7', y: '+=7', opacity: 0 }, '-=1');
  tl2.to($circlesBottomRight[2], 1, { scale: 0, x: '+=15', y: '-=5', opacity: 0 }, '-=1');
  
  tlBt2.set($circlesBottomRight, { x: 0, y: 0, rotation: -45 });
  tlBt2.add(tl2);

  btTl.add(tlBt1);
  btTl.to(bt1.parentNode.querySelectorAll('.button__bg'), 0.8, { scaleY: 1.1 }, 0.1);
  btTl.add(tlBt2, 0.2);
  btTl.to(bt1.parentNode.querySelectorAll('.button__bg'), 1.8, { scale: 1, ease: Elastic.easeOut.config(1.2, 0.4) }, 1.2);

  btTl.timeScale(2.6);

  bt1.addEventListener('click', function() {
    btTl.restart();
  });
}


// Button 2
function initBt2() {
  var bt = document.querySelectorAll('#component-2')[0];
  var particleCount = 12;
  var colors = ['#DE8AA0', '#8AAEDE', '#FFB300', '#60C7DA']

  bt.addEventListener('click', function() {
    var particles = [];
    var tl = new TimelineLite();
    
    tl.to(bt.querySelectorAll('.button__bg'), 0.6, { scaleX: 1.05 });
    tl.to(bt.querySelectorAll('.button__bg'), 0.9, { scale: 1, ease: Elastic.easeOut.config(1.2, 0.4) }, 0.6);

    for (var i = 0; i < particleCount; i++) {
      particles.push(document.createElement('span'));
      bt.appendChild(particles[i]);

      particles[i].classList.add(i % 2 ? 'left' : 'right');
      
      var dir = i % 2 ? '-' : '+';
      var r = i % 2 ? getRandom(-1, 1)*i/2 : getRandom(-1, 1)*i;
      var size = i < 2 ? 1 : getRandom(0.4, 0.8);
      var tl = new TimelineLite({ onComplete: function(i) {
        particles[i].parentNode.removeChild(particles[i]);
        this.kill();
      }, onCompleteParams: [i] });

      tl.set(particles[i], { scale: size });
      tl.to(particles[i], 0.6, { x: dir + 20, scaleX: 3, ease: SlowMo.ease.config(0.1, 0.7, false) });
      tl.to(particles[i], 0.1, { scale: size, x: dir +'=25' }, '-=0.1');
      if(i >= 2) tl.set(particles[i], { backgroundColor: colors[Math.round(getRandom(0, 3))] });
      tl.to(particles[i], 0.6, { x: dir + getRandom(60, 100), y: r*10, scale: 0.1, ease: Power3.easeOut });
      tl.to(particles[i], 0.2, { opacity: 0, ease: Power3.easeOut }, '-=0.2');
    }
  });
}


// Button 3
function initBt3() {
  var bt = document.querySelectorAll('#component-3')[0];
  var particleCount = 6;
  var particles;
  var clicked = false;

  bt.addEventListener('mouseenter', function() {
    particles = [];

    TweenLite.to(bt.querySelectorAll('.button__bg'), 1.5, { scaleX: 1.05, ease: Expo.easeOut, delay: 0.2 });

    for (var i = 0; i < particleCount; i++) {
      particles.push(document.createElement('span'));
      bt.appendChild(particles[i]);

      particles[i].classList.add(i % 2 ? 'left' : 'right');
      
      var dir = i % 2 ? '-' : '+';
      var tl = new TimelineLite();

      tl.to(particles[i], 2, { x: dir + 18, scaleX: 1.4, ease: Expo.easeOut });
    }
  });

  bt.addEventListener('mouseleave', function() {
    if (clicked) return;

    TweenLite.to(bt.querySelectorAll('.button__bg'), 0.9, { scale: 1, ease: Power3.easeOut, overwrite: 'all' });

    for (var i = 0; i < particles.length; i++) {
      particles[i].classList.add(i % 2 ? 'left' : 'right');

      TweenLite.to(particles[i], 0.6, { x: 0, scaleX: 1, ease: Power3.easeOut, onComplete: function() {
        this.target.parentNode.removeChild(this.target);
      } });
    }
  });

  bt.addEventListener('click', function() {
    clicked = true;

    TweenLite.to(bt.querySelectorAll('.button__bg'), 0.9, { scale: 1, ease: Elastic.easeOut.config(1.2, 0.4), delay: 0.1, 
      onComplete: function(){
        clicked = false;
      },
      onOverwrite: function(){
        clicked = false;
      } 
    }, 0.6);

    for (var i = 0; i < particleCount; i++) {
      var dir = i % 2 ? '-' : '+';
      var size = i < 2 ? 1 : getRandom(0.2, 0.6);
      var r = i % 2 ? getRandom(-1, 1)*i/2 : getRandom(-1, 1)*i;

      TweenLite.set(particles[i], { scale: size });
      TweenLite.to(particles[i], 0.1, { scale: size, x: dir +'=25' });
      TweenLite.to(particles[i], 0.6, { x: dir + 60, y: r*10, scale: 0, opacity: 0, ease: Power3.easeOut });
    }
  });
}


// Button 4
function initBt4() {
  var bt = document.querySelectorAll('#component-4')[0];
  var bg = document.querySelectorAll('#component-4 .button')[0];
  var blob = document.querySelectorAll('#component-4 .blob');

  bt.addEventListener('mousemove', function(e) {
    var x = (e.pageX - bt.offsetLeft - bt.offsetWidth / 2) * 0.6;
    var y = (e.pageY - bt.offsetTop - bt.offsetHeight / 2) * 0.6;

    TweenLite.to(blob[1], 4.2, { x: x, y: y, ease: Elastic.easeOut.config(1, 0.1) });
    TweenLite.to(blob[2], 2.8, { x: x, y: -y, ease: Elastic.easeOut.config(1, 0.1) });
    TweenLite.to(blob[3], 2.8, { x: -x, y: -y, ease: Elastic.easeOut.config(1, 0.1) });
  });

  bt.addEventListener('mouseup', function(e) {
    var x = e.pageX - bt.offsetLeft - blob[0].offsetWidth / 2;
    var y = e.pageY - bt.offsetTop - blob[0].offsetHeight / 2;

    var dirX = Math.random() > 0.5 ? -1 : 1;
    var dirY = Math.random() > 0.5 ? -1 : 1;
    var r = getRandom(60, 80);
    
    Array.prototype.slice.call(blob, 1).forEach(function(bt) {
      var tl = new TimelineLite();
      tl.to(bt, 1.2, { x: dirX * r * Math.random() + '%', y: dirY * r * Math.random() + '%', ease: Elastic.easeOut.config(1, 0.2) });
      tl.to(bt, 1.2, { x: '0%', y: '0%', ease: Elastic.easeOut.config(1, 0.2) }, '-=1.1');
    });
  });
}

// Button 5
function initBt5() {
  var bt = document.querySelectorAll('#component-5')[0];
  var turbVal = { val: 0.000001 };
  var turb = document.querySelectorAll('#filter-glitch-1 feTurbulence')[0];
  var btTl = new TimelineLite({ paused: true, onUpdate: function() {
    turb.setAttribute('baseFrequency', turbVal.val);
  } });

  btTl.to(turbVal, 0.2, { val: 0.04 });
  btTl.to(turbVal, 0.2, { val: 0.000001 });

  bt.addEventListener('click', function() {
    btTl.restart();
  });
}

// Button 6
function initBt6() {
  var bt = document.querySelectorAll('#component-6')[0];
  var turbVal = { val: 0.000001 };
  var turb = document.querySelectorAll('#filter-glitch-2 feTurbulence')[0];
  var btTl = new TimelineLite({ paused: true, onUpdate: function() {
    turb.setAttribute('baseFrequency', '0.00001 ' + turbVal.val); // Firefox bug is value is 0
  } });

  btTl.to(turbVal, 0.2, { val: 0.06 });
  btTl.to(turbVal, 0.2, { val: 0.000001 });

  bt.addEventListener('click', function() {
    btTl.restart();
  });
}

// Button 7
function initBt7() {
  var bt = document.querySelectorAll('#component-7')[0];
  var turbVal = { val: 0.000001 };
  var turb = document.querySelectorAll('#filter-glitch-3 feTurbulence')[0];
  var btTl = new TimelineLite({ paused: true, onUpdate: function() {
    turb.setAttribute('baseFrequency', '0.00001 ' + turbVal.val); // Firefox bug is value is 0
  } });

  btTl.to(turbVal, 0.4, { val: 0.4 });
  btTl.to(turbVal, 0.2, { val: 0.000001 });

  bt.addEventListener('click', function() {
    btTl.restart();
  });
}

// Button 8
function initBt8() {
  var bt = document.querySelectorAll('#component-8')[0];
  var turb = document.querySelectorAll('#filter-ripple-1 feImage')[0];
  var dm = document.querySelectorAll('#filter-ripple-1 feDisplacementMap')[0];
  
  bt.addEventListener('click', function(e) {
    TweenLite.set(turb, { attr: { x: isFF ? e.offsetX : e.offsetX + 10, y: isFF ? e.offsetY : e.offsetY + 10, width: 0, height: 0 } });
    TweenLite.to(turb, 3, { attr: { x: '-=300', y: '-=300', width: 600, height: 600 } });
    TweenLite.fromTo(dm, 2, { attr: { scale: 30 } }, { attr: { scale: 0 } });
  });
}

// Button 9
function initBt9() {
  var bt = document.querySelectorAll('#component-9')[0];
  var turb = document.querySelectorAll('#filter-ripple-2 feImage')[0];
  var dm = document.querySelectorAll('#filter-ripple-2 feDisplacementMap')[0];
  
  bt.addEventListener('click', function(e) {
    TweenLite.set(turb, { attr: { x: isFF ? e.offsetX : e.offsetX + 20, y: isFF ? e.offsetY : e.offsetY + 20, width: 0, height: 0 } });
    TweenLite.to(turb, 5, { attr: { x: '-=300', y: '-=300', width: 600, height: 600 } });
    TweenLite.fromTo(dm, 3, { attr: { scale: 30 } }, { attr: { scale: 0 } });
  });
}

// Button 10
function initBt10() {
  var bt = document.querySelectorAll('#component-10')[0];
  var btTxt = bt.querySelector('.button__text');
  var isPlaying = false;
  var turbVal = { val: 0.000001 };
  var turbValX = { val: 0.000001 };
  var turb = document.querySelectorAll('#filter-music feTurbulence')[0];
  var btTl = new TimelineLite({ paused: true, onUpdate: function() {
    turb.setAttribute('baseFrequency', turbVal.val + ' ' + turbValX.val);
  }, onComplete: function() { 
    btTl.reverse();
  }, onReverseComplete: function() {
    btTl.restart();
  } });

  btTl.to(turbValX, 0.4, { val: 0.04, ease: Power0.easeNone }, 0);
  btTl.to(turbVal, 0.1, { val: 0.2 ,ease: Power0.easeNone }, 0);

  bt.addEventListener('click', function() {
    if(isPlaying) {
      btTxt.textContent = 'Play';
      btTl.pause()
      var btTl2 = new TimelineLite({ onUpdate: function() {
        turb.setAttribute('baseFrequency', turbVal.val + ' ' + turbValX.val);
      } });
      btTl2.to(turbVal, 0.1, { val: 0.000001 });
      btTl2.to(turbValX, 0.1, { val: 0.000001 }, 0);
      isPlaying = false;
    } else {
      btTxt.textContent = 'Pause';
      btTl.play();
      isPlaying = true;
    }
  });
}