// /* eslint-disable */
/* global $ app $jit myId lang */
var st
(function() {
  var ua = navigator.userAgent
  var iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i)
  var typeOfCanvas = typeof HTMLCanvasElement
  var nativeCanvasSupport = (typeOfCanvas === 'object' || typeOfCanvas === 'function')
  var textSupport = nativeCanvasSupport && (typeof document.createElement('canvas').getContext('2d').fillText === 'function')
  // I'm setting this based on the fact that ExCanvas provides text support for IE
  // and that as of today iPhone/iPad current text support is lame
  var labelType = (!nativeCanvasSupport || (textSupport && !iStuff)) ? 'Native' : 'HTML'
  var nativeTextSupport = labelType === 'Native' //eslint-disable-line
  var useGradients = nativeCanvasSupport //eslint-disable-line
  var animate = !(iStuff || !nativeCanvasSupport) //eslint-disable-line
})()

function $post(i, _nodeId) {
  return $.post(app.reqUrl, {
    __RequestVerificationToken: app.token,
    LayoutIndex: 1,
    PageIndex: i,
    ShowNumber: 20,
    UserName: _nodeId
  })
}

function $push(res, _treeRoot, hasAdd) {
  if (res.msg === 'StatusOk') {
    res.data.data.forEach(function(user) {
      _treeRoot.children.push({
        id: user.UserName,
        name: user.NickName,
        children: [],
        data: {parentNode: _treeRoot.id}
      })
    })
    if (!hasAdd) {
      _treeRoot.children.push({
        id: 'add' + _treeRoot.id,
        name: '+<span class="glyphicon glyphicon-user"></span>',
        children: [],
        data: {parentNode: _treeRoot.id}
      })
    }
  }
}

function getAll(node, rootNode) {
  return $post(1, node).then(function(res) {
    $push(res, rootNode)
    if (res.data.Page > 1) {
      var arrAjax = []
      for (var j = 0; j < res.data.Page - 1; j++) {
        arrAjax.push($post((j + 2), node))
      }
      return $.when.apply(null, arrAjax).then(
        function() {
          var args = ([]).slice.call(arguments, 0)
          args.forEach(function(arrRes) {
            $push(arrRes[0] || arrRes, rootNode, true)
          })
          return rootNode
        }
      )
    } else {
      return rootNode
    }
  })
}

var Log = {
  elem: false,
  write: function(text) {
    if (!this.elem) {
      this.elem = document.getElementById('log')
    }
    this.elem.innerHTML = text
  }
}
// exported init

function init() { // eslint-disable-line
  // A client-side tree generator
  var getTree = (function() {
    var i = 0 // eslint-disable-line
    return function(nodeId, level, subtree) {
      $jit.json.prune(subtree, level)
      i++
      return {
        'id': nodeId,
        'children': subtree.children
      }
    }
  })()

  // Implement a node rendering function called 'nodeline' that plots a straight line
  // when contracting or expanding a subtree.
  $jit.ST.Plot.NodeTypes.implement({
    'nodeline': {
      'render': function(node, canvas, animating) {
        if (animating === 'expand' || animating === 'contract') {
          var pos = node.pos.getc(true)
          var nconfig = this.node
          var data = node.data // eslint-disable-line
          var width = nconfig.width
          var height = nconfig.height
          var algnPos = this.getAlignedPos(pos, width, height)
          var ctx = canvas.getCtx()
          var ort = this.config.orientation
          ctx.beginPath()
          if (ort === 'left' || ort === 'right') {
            ctx.moveTo(algnPos.x, algnPos.y + height / 2)
            ctx.lineTo(algnPos.x + width, algnPos.y + height / 2)
          } else {
            ctx.moveTo(algnPos.x + width / 2, algnPos.y)
            ctx.lineTo(algnPos.x + width / 2, algnPos.y + height)
          }
          ctx.stroke()
        }
      }
    }

  })

  // init Spacetree
  // Create a new ST instance
  st = new $jit.ST({
    'orientation': 'top',
    'injectInto': 'infovis',
    // set duration for the animation
    duration: 500,
    // set animation transition type
    transition: $jit.Trans.Quart.easeInOut,
    // set distance between node and its children
    levelDistance: 60,
    // set max levels to show. Useful when used with
    // the request method for requesting trees of specific depth
    levelsToShow: 2,
    // set node and edge styles
    // set overridable=true for styling individual
    // nodes or edges
    Node: {
      height: 20,
      width: 70,
      // use a custom
      // node rendering function
      type: 'nodeline',
      color: '#23A4FF',
      lineWidth: 2,
      align: 'center',
      overridable: true
    },

    Edge: {
      type: 'bezier',
      lineWidth: 2,
      color: '#23A4FF',
      overridable: true
    },

    // Add a request method for requesting on-demand json trees.
    // This method gets called when a node
    // is clicked and its subtree has a smaller depth
    // than the one specified by the levelsToShow parameter.
    // In that case a subtree is requested and is added to the dataset.
    // This method is asynchronous, so you can make an Ajax request for that
    // subtree and then handle it to the onComplete callback.
    // Here we just use a client-side tree generator (the getTree function).
    request: function(nodeId, level, onComplete) {
      var ans = null
      var subtree = {id: nodeId, children: [], data: {}}
      getAll(nodeId, subtree).then(function(res) {
        var arrDef = res.children.map(function(subNode) {
          return getAll(subNode.id, subNode)
        })
        $.when.apply(null, arrDef).then(function() {
          ans = getTree(nodeId, level, subtree)
          onComplete.onComplete(nodeId, ans)
          app.currentView === 0
            ? app.shipData = st.json
            : app.generationData = st.json
        })
      })
    },

    onBeforeCompute: function(node) {
      lang === 'zh-CN'
        ? Log.write('正在加载 ' + node.name + ' 的数据')
        : Log.write('Loading ' + node.name + '\'s Data')
    },

    onAfterCompute: function() {
      lang === 'zh-CN'
        ? Log.write('加载完成')
        : Log.write('Done')
    },

    // This method is called on DOM label creation.
    // Use this method to add event handlers and styles to
    // your node.
    onCreateLabel: function(label, node) {
      label.id = node.id
      label.innerHTML = node.name
      label.onclick = function() {
        if (node.id === app.currentNode) {
          return
        }
        app.currentNode = node.id
        if (node.id.slice(0, 3) === 'add') {
            window.location = 'http://192.168.1.3:20003/' + lang + '/Account/Entry?Inviter=' + myId + '&Setter=' + node.data.parentNode
          return
        }
        st.onClick(node.id)
      }
      // set label styles
      var style = label.style
      style.width = 70 + 'px'
      style.height = 17 + 'px'
      style.cursor = 'pointer'
      style.color = '#fff'
      // style.backgroundColor = '#1a1a1a';
      style.fontSize = '14px'
      style.textAlign = 'center'
      style.textDecoration = 'none'
      style.paddingTop = '3px'
    },

    // This method is called right before plotting
    // a node. It's useful for changing an individual node
    // style properties before plotting it.
    // The data properties prefixed with a dollar
    // sign will override the global node style properties.
    onBeforePlotNode: function(node) {
      // add some color to the nodes in the path between the
      // root node and the selected node.
      if (node.selected) {
        node.data.$color = '#ff7'
      } else {
        delete node.data.$color
      }
    },

    // This method is called right before plotting
    // an edge. It's useful for changing an individual edge
    // style properties before plotting it.
    // Edge data proprties prefixed with a dollar sign will
    // override the Edge global style properties.
    onBeforePlotLine: function(adj) {
      if (adj.nodeFrom.selected && adj.nodeTo.selected) {
        adj.data.$color = '#eed'
        adj.data.$lineWidth = 3
      } else {
        delete adj.data.$color
        delete adj.data.$lineWidth
      }
    }
  })
  // load json data
  st.loadJSON(app.shipData)
  // compute node positions and layout
  st.compute()
  // emulate a click on the root node.
  st.onClick(st.root)
  // end
}
