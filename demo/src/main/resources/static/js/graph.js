//enviroment by codinGame
function lineIntersects (p0, p1, p2, p3) {
  var s1x = p1.x - p0.x
  var s1y = p1.y - p0.y
  var s2x = p3.x - p2.x
  var s2y = p3.y - p2.y

  var s = (-s1y * (p0.x - p2.x) + s1x * (p0.y - p2.y)) / (-s2x * s1y + s1x * s2y)
  var t = (s2x * (p0.y - p2.y) - s2y * (p0.x - p2.x)) / (-s2x * s1y + s1x * s2y)

  return s > 0 && s < 1 && t > 0 && t < 1
}

//check line center intersection
function lineIntersectsCenter(c, a, b){
  var bc = distance(c,b)
  var ac = distance(a,c)
  var acAndbc = bc + ac
  var ab = distance(a,b)
  var bool = Math.round(acAndbc) == Math.round(ab)
  return bool
}

function linePolygonIntersection (src, dst, o) {
  var c = polygon(o)
  if (o.manual){
    var center = findcenter(o.manual);
    var sortedPoints = o.manual.sort((a,b) => SortClockwise (a,b, center))
    for (var k = 0; k < sortedPoints.length; k++) {
      if (lineIntersects(sortedPoints[k], sortedPoints[(k + 1) % sortedPoints.length], src, dst)) {
        return true
      }
    }
    return false
  }
  for (var k = 0; k < c.length; k++) {
    if (lineIntersects(c[k], c[(k + 1) % c.length], src, dst)) {
      return true
    }
  }
  return false
}

function directPath (src, dst, coords) {
  return coords
    .filter(o => src !== o)
    .every(o => !linePolygonIntersection(src, dst, o))
}

function buildGraph (coords) {

  var centers = []
  for (let shape of coords){
    if (shape.manual){
      var center = findcenter(shape.manual);
      var sortedshape = shape.manual.sort((a,b) => SortClockwise (a,b, center))
      centers.push(center)
      for (let point1 of sortedshape){
        for (let point2 of sortedshape){
          var length = sortedshape.length
          var firstLast = sortedshape.indexOf(point1) == 0 && sortedshape.indexOf(point2) == length-1
          var lastFirst = sortedshape.indexOf(point1) == length-1  && sortedshape.indexOf(point2) == 0
          var loopCheck = firstLast && lastFirst
          if (sortedshape.indexOf(point1) != sortedshape.indexOf(point2) && sortedshape.indexOf(point1) != sortedshape.indexOf(point2) +1 && sortedshape.indexOf(point1) != sortedshape.indexOf(point2) -1 && !lastFirst && !firstLast){
            var points = [point1, point2]
            var middle = findcenter(points)
            centers.push(middle)
          }
        }
      }
    }
  }

  // Add edge from each vertex to all visible vertex
  const allVertices = coords
    .map(dst => polygon(dst))
    .reduce((a, b) => [...a, ...b])

  const graph = {}
  coords.forEach(src => {
    
    const srcPoly = polygon(src)
    
    // Centers can also reach any visible vertices
    if(src.sg){
      srcPoly.push(src)
    }
      
    srcPoly.forEach(srcP => {
      allVertices
        .filter(c => c.x !== srcP.x || c.y !== srcP.y)
        .forEach(c => {
          if (directPath(srcP, c, coords)) {
            const key = `${srcP.x} ${srcP.y}`
            if (graph[key] == null) {
              graph[key] = []
            }
            //check if inside shape before push 
            var centerCheck = true
            for (let point of centers){
              if (lineIntersectsCenter(point, srcP, c)){
                centerCheck = false
              }
            }
            if (centerCheck) graph[key].push(c)
          }
        })
    })
  })
  return graph
}