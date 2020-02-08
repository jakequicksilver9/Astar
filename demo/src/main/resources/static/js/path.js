{const top=0,parent=c=>(c+1>>>1)-1,left=c=>(c<<1)+1,right=c=>c+1<<1;class PriorityQueue{constructor(c=(d,e)=>d>e){this._heap=[],this._comparator=c}size(){return this._heap.length}isEmpty(){return 0==this.size()}peek(){return this._heap[top]}push(...c){return c.forEach(d=>{this._heap.push(d),this._siftUp()}),this.size()}pop(){const c=this.peek(),d=this.size()-1;return d>top&&this._swap(top,d),this._heap.pop(),this._siftDown(),c}replace(c){const d=this.peek();return this._heap[top]=c,this._siftDown(),d}_greater(c,d){return this._comparator(this._heap[c],this._heap[d])}_swap(c,d){[this._heap[c],this._heap[d]]=[this._heap[d],this._heap[c]]}_siftUp(){for(let c=this.size()-1;c>top&&this._greater(c,parent(c));)this._swap(c,parent(c)),c=parent(c)}_siftDown(){for(let d,c=top;left(c)<this.size()&&this._greater(left(c),c)||right(c)<this.size()&&this._greater(right(c),c);)d=right(c)<this.size()&&this._greater(right(c),left(c))?right(c):left(c),this._swap(c,d),c=d}}window.PriorityQueue=PriorityQueue}

function distance (a, b) {
    return Math.sqrt(squareDistance(a, b))
  }
  
  function squareDistance (a, b) {
    return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y)
  }
  function actions(x ,y , graph){
    var vectors = graph[`${x} ${y}`]
    return vectors
  }

  function comparePoints(a, b){
    if (typeof a === 'undefined') return false
    if (typeof b === 'undefined') return false
    if (a.x == b.x && a.y == b.y) return true
    else return false
  }

function aStar (graph, srcNode, dstNode) {
  const start = {x:srcNode.x, y:srcNode.y}
  const goal = {x:dstNode.x, y:dstNode.y}
  const open = new PriorityQueue((a, b) => a.g + a.h < b.g + b.h )
  const closed = []
  //start
  open.push({x:srcNode.x, y:srcNode.y, g: 0, h: 0, path: [srcNode]})

  //open is empty?
  while(!open.isEmpty()){                     
    var current = open.pop()                  //pick n best and remove from open
    var currentCoords = {x: current.x, y:current.y}
    closed.push(current)                      //add n best to closed

    // n best == goal?
    if (directPath(goal, currentCoords)) {       
      return [...current.path,dstNode]        //end
    }
    
    //expand all nodes x that are neighbors of n best 
    var x = []
    x = graph[`${current.x} ${current.y}`]

    //remove nodes also present in closed
    for (var i = 0; i<x.length; i++){
      for (var j = 0; j<closed.length; j++){
        if (comparePoints(x[i], closed[j]))  x.splice(i,1)
      }
    }
    for (var t = 0; t<x.length; t++){
      var b = true
      for (var z = 0; z<open._heap.length; z++){
        if (comparePoints(x[t], open._heap[z]))  b = false
      }
      if (b){
        const costToGoal = distance(x[t], goal)
        const newPath = current.path.slice()
        newPath.push({ x: x[t].x, y: x[t].y })
        const distToCurrent = distance(x[t], current)
        open.push({x:x[t].x, y:x[t].y, g: current.g + distToCurrent, h: costToGoal, path: newPath})                            //add x to open
      }
    }
  }
}

