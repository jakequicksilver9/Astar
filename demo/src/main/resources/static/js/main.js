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

const enviroment1 = [
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

const shape1 = [
  {x: 271, y: 140},
  {x: 346, y: 122},
  {x: 323, y: 190},
]

const shape2 = [
  {x: 102, y: 99},
  {x: 152, y: 254},
  {x: 93, y: 250},
  {x: 158, y: 111},
]

const shape3 = [
  {x: 395, y: 110},
  {x: 427, y: 11},
  {x: 391, y: 282},
  {x: 415, y: 280},
]

const shape4 = [
  {x: 197, y: 32}, 
  {x: 235, y: 28}, 
  {x: 275, y: 117},
  {x: 262, y: 57}, 
  {x: 199, y: 78}, 
  {x: 225, y: 130},
]

const shape5 = [
  {x: 465, y: 72},
  {x: 511, y: 12},
  {x: 517, y: 65},
]

const shape6 = [
  {x: 424, y: 183},
  {x: 542, y: 123},
  {x: 445, y: 119},
  {x: 585, y: 170},
]

const enviroment2 = [
  {x:69, y:11, sg:true },    //start
  {x:608, y:163, sg:true },   //goal
  {manual:shape1, n:3}, 
  {manual:shape2, n:4}, 
  {manual:shape3, n:4},
  {manual:shape4, n:6},
  {manual:shape5, n:3},
  {manual:shape6, n:4},
]

function Create(){
  var app = new PIXI.Application({
    width: 650,
    height: 300,
    antialias: true,
    backgroundColor:0x5CC569
  })
  return app
}

function main () {
  switch($('#envirnoment').val()){
    case "1":{
      var coordinates = enviroment1
      break
    }
    case "2":{
      var coordinates = enviroment2
      break
    }
  }
  if ($('canvas')) Clear()
  var app = Create()
  document.body.appendChild(app.view)
  app.view.style.width = '85%'
  const graph = buildGraph(coordinates)
  drawGraph(app.stage, graph)
  if ($('#fill').is(':checked')) drawShapes(app.stage, coordinates)
  const path = potentialSearch(graph, coordinates[0], coordinates[1], coordinates)
  if (path != null) drawPath(app.stage, path)

  document.addEventListener("click",function(e){
    mouseposition = app.renderer.plugins.interaction.mouse.global;
    var x = Math.round(mouseposition.x)
    var y = Math.round(mouseposition.y)
    console.log("{x: " + x + ", y: " + y + "}");
})
}

function Clear(){
  $('canvas').remove()
}
