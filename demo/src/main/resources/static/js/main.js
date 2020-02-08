const pentagon = [
  {x: 150, y: 20},  //top           //1
  {x: 80, y: 160},  //bottom left   //2
  {x: 70, y:  80},  //top left      //3
  {x: 200, y: 80},  //top right     //4
  {x: 150, y: 180}, //bottom right  //5
]

const longRectangle = [
  {x: 85, y: 280},//0
  {x: 300, y: 210},//1
  {x: 85, y: 210}, //3
  {x: 300, y: 280},//2
]

const leftTriangle = [
  {x: 230, y: 70}, //top
  {x: 200, y: 180}, //bottom left 
  {x: 250, y: 180}, //bottom right
]

const midTrap = [
  {x: 260, y: 115},//0
  {x: 260, y: 15},//3
  {x: 365, y: 50},//1
  {x: 325, y: 15}, //2
]

const rightRect = [
  {x: 375, y: 150},//0
  {x: 460, y: 15}, //3
  {x: 375, y: 15},//1
  {x: 460, y: 150},//2
]

const bottomTri = [
  {x: 312, y: 130},
  {x: 390, y: 194},
  {x: 333, y: 238},
]

const hex = [
  {x: 471, y: 158},//top
  {x: 420, y: 247},//left bottom
  {x: 500, y: 238},//right bottom
  {x: 500, y: 187},//right top
  {x: 450, y: 274},//bottom
  {x: 420, y: 202},//left top
]

const kite = [  
  {x: 475, y: 32},
  {x: 502, y: 13},
  {x: 504, y: 156},
  {x: 530, y: 30},
]

const coords = [
  {x: 40, y: 250, sg:true },    //start
  {x: 550, y: 30, sg:true },   //goal
  {n:5, manual:pentagon }, 
  {manual:longRectangle, n:4}, 
  {manual: leftTriangle, n:3 }, 
  {manual: midTrap, n:4 },
  {manual: rightRect, n:4 },
  {manual: bottomTri, n:3 },
  {manual: hex, n:6 },
  {manual: kite, n:4 },
]

const app = new PIXI.Application({
  width: 650,
  height: 300,
  antialias: true,
  backgroundColor:0x5CC569
})

function main () {
  document.body.appendChild(app.view)
  app.view.style.width = '85%'
  const graph = buildGraph()
  drawGraph(app.stage, graph)
  drawShapes(app.stage)
  const path = aStar(graph, coords[0], coords[1])
  drawPath(app.stage, path)
}

main()

