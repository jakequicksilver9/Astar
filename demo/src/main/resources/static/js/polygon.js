function polygon (src) {
  const res = []
  const n = src.n 
  const r = src.radius / Math.cos(Math.PI / n)
  if (!src.manual ){
      res.push({
        x: src.x ,
        y: src.y
      })
  }
  else{
    for (let t = 0; t < n; t++) {
      res.push(src.manual[t])
    }
  }
  return res
}