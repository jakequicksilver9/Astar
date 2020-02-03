function polygon (src) {
    const res = []
    const n = src.n 
    const r = (src.radius + extraSpace) / Math.cos(Math.PI / n)
    for (let t = 0; t < n; t++) {
      res.push({
        x: src.x + Math.round((r + 0.5) * Math.cos((2 * Math.PI * t) / n)),
        y: src.y + Math.round((r + 0.5) * Math.sin((2 * Math.PI * t) / n))
      })
    }
    return res
  }