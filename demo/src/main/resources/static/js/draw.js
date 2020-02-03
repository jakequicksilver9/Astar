function drawPolygons (stage) {
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
    var line = new PIXI.Graphics()
    line.lineStyle(3, 0xffffff)
    line.moveTo(path[0].x, path[0].y)
    for (let k = 1; k < path.length; k++) {
      line.lineTo(path[k].x, path[k].y)
    }
    stage.addChild(line)
  }
  
  function drawFactories (stage) {
    coords.forEach(c => {
        const graphics = new PIXI.Graphics()
        var poly = polygon(c);
        graphics.beginFill(0xDE3249)
        graphics.moveTo(poly[0].x, poly[0].y)
        for (let i = 0; i < poly.length; i++) {
          const pt = poly[(i + 1) % poly.length]
          graphics.lineTo(pt.x, pt.y)
        }
        graphics.endFill()
        stage.addChild(graphics)
    })
  }
  
  function drawBackground (stage) {
    const background = PIXI.Graphics()
    background.width = 600
    background.height = 340
    stage.addChild(background)
  }