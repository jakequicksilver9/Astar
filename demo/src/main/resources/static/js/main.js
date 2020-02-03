const coords = [{ x: 405, y: 20, radius: 1, n:4 },{ x: 550, y: 300, radius: 1, n:4 },{ x: 100, y: 200, radius: 20, n:4 }, { x: 250, y: 230, radius: 50, n:4 }, { x: 350, y: 120, radius: 50, n:4 }, { x: 500, y: 200, radius: 50, n:4 }]
const extraSpace = 1

function main () {
  // Create app
  const app = new PIXI.Application({
    width: 600,
    height: 340,
    antialias: true,
    backgroundColor:0x5CC569
  })
  document.body.appendChild(app.view)
  app.view.style.width = '65%'

//   drawBackground(app.stage)
  const graph = buildGraph()
  drawGraph(app.stage, graph)
 
  drawFactories(app.stage)

  const path = shortestPath(graph, coords[0], coords[1])
  drawPath(app.stage, path)

}

main()