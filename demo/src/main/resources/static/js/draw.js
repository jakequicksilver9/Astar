function drawPolygons (stage, coords) {
  coords.forEach(c => {
    const p = polygon(c)

    var line = new PIXI.Graphics()
    line.lineStyle(1, 0xffffff)
    line.moveTo(p[0].x, p[0].y)
    for (let i = 0; i < p.length; i++) {
      const pt = p[(i + 1) % p.length]
      line.lineTo(pt.x, pt.y)
    }
    stage.addChild(line)
  })
}
  
function drawGraph (stage, graph) {
  Object.entries(graph).forEach(([src, dst]) => {
    dst.forEach(d => {
      const line = new PIXI.Graphics()
      line.lineStyle(1, 0xffffff)
      line.alpha = 0.1
      const x = parseInt(src.split(' ')[0])
      const y = parseInt(src.split(' ')[1])
      line.moveTo(x, y)
      line.lineTo(d.x, d.y)
      stage.addChild(line)
    })
  })
}
  
function drawPath (stage, path) {
  if (path){
    var line = new PIXI.Graphics()
    line.lineStyle(3, 0xffffff)
    line.moveTo(path[0].x, path[0].y)
    for (let k = 1; k < path.length; k++) {
      line.lineTo(path[k].x, path[k].y)
    }
    stage.addChild(line)
  }
}

function SortClockwise( A, B, center) {
  var aTanA = Math.atan2(A.y - center.y, A.x - center.x);
  var aTanB = Math.atan2(B.y - center.y, B.x - center.x);
  if (aTanA < aTanB) return -1;
  else if (aTanB < aTanA) return 1;
  return 0;
}

function findcenter (pts) {
  var x = 0;
  var y = 0;
  for(i = 0; i < pts.length; i++) {
      x += pts[i].x;
      y += pts[i].y;
  }
  return {x: x/pts.length, y:y/pts.length};
}

function drawShapes (stage, coords) {
  coords.forEach(c => {
    const graphics = new PIXI.Graphics()
    if (c.sg){
      var poly = polygon(c);
      graphics.beginFill(0xDE3249)
      graphics.moveTo(poly[0].x, poly[0].y)
      graphics.drawRect(c.x -2.5, c.y -2.5, 5, 5)
    }
    else{
      var center = findcenter(c.manual);
      graphics.beginFill(0xDE3249)
      var sortedPoints = c.manual.sort((a,b) => SortClockwise (a,b, center))
      graphics.moveTo(sortedPoints[0].x, sortedPoints[0].y)
      sortedPoints.forEach(pair=>{graphics.lineTo(pair.x, pair.y)})
    }
    graphics.endFill()
    stage.addChild(graphics)
  })
}