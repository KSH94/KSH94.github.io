function init(node) {
  var g = node.data.graphic;
  var context = node.data.graphic.context;
  if (node.data.type == 'window') {
    context.fillstyle = g.textColor;
    context.strokeRect(g.x, g.y, g.width, g.height);
  } else {
    context.fillStyle = g.backColor;

    context.fillRect(g.x, g.y, g.width, g.height);
  }
  if (g.exit == true) {
    dButton = {
      x: g.x + g.width - 25,
      y: g.y,
      width: 25,
      height: 25
    };
    deletionWindow(dButton, node);
  }
  context.fillStyle = g.textColor;
  context.font = g.titleSize.toString() + "px Arial";
  context.textAlign = "center";
  context.fillText(g.title, g.x + g.width / 2, g.y + g.lineHeight / 2);
  context.font = g.textSize.toString() + "px Arial";
  context.textAlign = "center";
  context.fillText(g.text, g.x + g.width / 2, g.y + g.height / 2);
}

function createWindow(node) {
  var g = node.data.graphic;
  init(node);
  drawline(g.context,g.x, g.y + g.lineHeight, g.x + g.width, g.y + g.lineHeight, "dimgrey");
}

function createTextBox(node) {
  var g = node.data.graphic;
  init(node);
}

function createButton(node) {
  var g = node.data.graphic;
  init(node);
  if (g.alert == true) {
    AlertEvent(node);
  }
  if (g.createChild == true) {
    CreateChildEvent(node);
  }
  if (g.dialog == true) {
    DialogEvent(node);
  }
}

function createMenu(node) {
  var g = node.data.graphic;
  init(node);
  mButton = {
    x: g.x,
    y: g.y,
    width: 25,
    height: 25
  };
  menuWindow(mButton, node);
}

function deletionWindow(dButton, node) {
  var g = node.data.graphic;
  var context = node.data.graphic.context;
  var d = dButton;
  context.fillStyle = "lightcoral";
  context.fillRect(d.x, d.y, d.width, d.height);
  drawline(context,5, 5, 10, 10);
  drawline(context,d.x + 3, d.y + 3, d.x + d.width - 3, d.y + d.height - 3, "white");
  drawline(context,d.x + d.width - 3, d.y + 3, d.x + 3, d.y + d.height - 3, "white");
  DeletionEvent(dButton, node);
}

function menuWindow(mButton, node) {
  var g = node.data.graphic;
  var m = mButton;
  var context = g.context;
  context.fillStyle = "lightgrey";
  context.fillRect(m.x, m.y, m.width, m.height);
  drawline(context,m.x, m.y + m.height / 2, m.x + m.width, m.y + m.height / 2, "white");
  drawline(context,m.x + m.width / 2, m.y + m.height, m.x + m.width / 2, m.y, "white");
  MenuEvent(m, node);
}

function DeletionEvent(dButton, node) {
  var g = node.data.graphic;
  var canvas = node.data.graphic.canvas;
  var context = node.data.graphic.context;

  canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    if (isInside(mousePos, dButton)) {
      g.alert = false;
      context.clearRect(g.x - 1, g.y - 1, g.width + 2, g.height + 2);
      canvas.style.zIndex = "-1";
    }
  }, false);
}

function AlertEvent(node) {
  var g = node.data.graphic;
  var canvas = node.data.graphic.canvas;
  canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    if (isInside(mousePos, g) == 0 && g.alert == true) {
      alert(node.data.graphic.text + " needs to be closed first!");
    }
  }, false);
}

function DialogEvent(node) {
	var g = node.data.graphic;
  var canvas = g.canvas;
  var context = g.context;
  canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    if (isInside(mousePos, g) == true) {
			var url = prompt("url:", "https://www.naver.com");
      if(url)
      	window.open(url);
		}
  }, false);
}

function CreateChildEvent(node) {
  var g = node.data.graphic;
  canvas = g.canvas;
  context = g.context;
  canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    if (isInside(mousePos, g)) {
      var callId = node.parent.data.id * 10 + node.data.id;
      var s_node = search_node(node.parent, callId);
      renderGraphic(s_node);
      s_node.data.graphic.alert = true;
      s_node.data.graphic.canvas.style.zIndex = "2";
    }
  }, false);
}

function MenuEvent(mButton, node) {
  var clicked = false;
  var g = node.data.graphic;
  var canvas = g.canvas;
  var context = g.context;
  canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    if (isInside(mousePos, mButton)) {
      if (clicked == false) {
        for (var i = 0; i < g.menuList.length; i++) {
          var data = {
            id: i + 1,
            type: "button",
            graphic: {
            	canvas: canvas,
              context: context,
              x: g.x,
              y: g.y + (g.height + 1) * (i + 1),
              width: g.width / 2,
              height: g.height,
              backColor: g.backColor,
              textColor: g.textColor,
              title: "",
              titleSize: 0,
              text: g.menuList[i],
              textSize: g.textSize,
              exit: false,
              alert: false,
              createChild: true,
            }
          };
          var temp = new Node(data);
          add_node(temp, node);
          renderGraphic(temp);
        }
        clicked = true;
      } else {
        context.clearRect(g.x, g.y + (g.height + 1),
          g.width / 2 + 1, (g.height + 1) * (g.menuList.length));
        var p_g = node.parent.data.graphic;
        drawline(context,g.x, p_g.y + p_g.lineHeight, g.x + g.width / 2 + 2,
          p_g.y + p_g.lineHeight, "dimgrey");
        clicked = false;
      }
    }
  }, false);
}

function drawline(context, x1, y1, x2, y2, color) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = color;
    context.stroke();
    context.closePath();
}

function isInside(pos, rect) {
    return (pos.x > rect.x && pos.x < rect.x + rect.width &&
        pos.y < rect.y + rect.height && pos.y > rect.y)
}

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
