Pts.namespace(window);
Pts.quickStart("#pt", "transparent");

(function() {
  
  var pts = new Group();

  space.add({ 
    start:() => {
      let center = space.center;
      let radius = Math.sqrt(Math.pow(center[0], 2) + Math.pow(center[1], 2));
      let startX = center[0] - radius;
      let startY = center[1] - radius;
      let endX = center[0] + radius;
      let endY = center[1] + radius;
      let bound =  new Bound(
        new Pt(startX, startY),
        new Pt(endX, endY)
      );
      
      pts = Create.distributeRandom(bound, 100);
      pts.forEach((p, i) => {pts[i].opacity = 0.15}); 
    }, 

    animate: (time, ftime) => {
      pts.rotate2D(0.0005, space.center);
      let path = [new Pt(space.width, 0), new Pt(0, space.height)];

      pts.forEach( (p, i) => {
        let lp = Line.perpendicularFromPt(path, p);
        let line = [p, lp];
        let dist = Line.distanceFromPt(line, space.pointer);

        if (dist < 50) {
          if (pts[i].opacity < 0.5) {
            pts[i].opacity += 0.01;
          }
        } else {
          if (pts[i].opacity > 0.15) {
            pts[i].opacity -= 0.004;
          }
        }
        
        form.fillOnly( ["#32ff7e", "#18dcff", "#7d5fff"][i%3] ).point( p, 1.3 );
        form.stroke(`rgba(150,150,150,${pts[i].opacity}`).line(line);
      });
    },
  });

  space.bindMouse().bindTouch().play();
})();
