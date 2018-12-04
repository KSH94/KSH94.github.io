
    function createWindow(myWindow){
      var x = myWindow.x;
      var y = myWindow.y;
      var width = myWindow.width;
      var height = myWindow.height;
      var color  = myWindow.color;
      var title  = myWindow.title;
      var textColor = myWindow.textColor;

      context.fillStyle = color;
      context.fillRect(x,y,width,height);

      dButton = {x:x+width-25, y:y, width:25, height:25};
      deleteWindow(dButton,myWindow);
      hButton = {x:x+width-50, y:y, width:25, height:25};
      hideWindow(hButton,myWindow);

      context.fillStyle = textColor;
      var font_size = width/10;
      context.font = font_size.toString() + "px Arial";
      context.textAlign = "center";
      context.fillText(title,x+width/2,y+height/6);

      drawline(x,y+height/5,x+width,y+height/5, "ivory");
    }

     function createButton(myButton){
      var x = myButton.x;
      var y = myButton.y;
      var width = myButton.width;
      var height = myButton.height;
      var color  = myButton.color;
      var text  = myButton.text;
      var textColor = myButton.textColor;

      context.fillStyle = color;
      context.fillRect(x,y,width,height);

      AddAlertEvent(myButton);

      dButton = {x:x+width-25, y:y, width:25, height:25};
      deleteWindow(dButton,myButton);

      context.fillStyle = textColor;
      var font_size = width/10;
      context.font = font_size.toString() + "px Arial";
      context.textAlign = "center";
      context.fillText(text,x+width/2,y+height/2);
    }

    function createTextBox(myTextBox){
      var x = myTextBox.x;
      var y = myTextBox.y;
      var width = myTextBox.width;
      var height = myTextBox.height;
      var color  = myTextBox.color;
      var text  = myTextBox.text;
      var textColor = myTextBox.textColor;
      var textSize  = myTextBox.textSize;
      var exit = myTextBox.exit;

      context.fillStyle = color;
      context.fillRect(x,y,width,height);
      context.strokeRect(x,y,width,height);

      if(exit == true){
        dButton = {x:x+width-25, y:y, width:25, height:25};
        deleteWindow(dButton,myTextBox);
      }
      context.fillStyle = textColor;
      var font_size = width/10;
      context.font =  textSize.toString() + "px Arial";
      context.textAlign = "center";
      context.fillText(text,x+width/2,y+height/2);
    }

    function createMenu(myMenu){
      var x = myMenu.x;
      var y = myMenu.y;
      var width = myMenu.width;
      var height = myMenu.height;
      var color  = myMenu.color;
      var text  = myMenu.text;
      var textColor = myMenu.textColor;
      var textSize  = myMenu.textSize;
      var menuList = myMenu.menuList;

      context.fillStyle = color;
      context.fillRect(x,y,width,height);

      dButton = {x:x+width-25, y:y, width:25, height:25};
      deleteWindow(dButton,myMenu);

      mButton = {x:x, y:y, width:25, height:25};
      menuWindow(mButton,myMenu);

      context.fillStyle = textColor;
      var font_size = width/10;
      context.font =  textSize.toString() + "px Arial";
      context.textAlign = "center";
      context.fillText(text,x+width/2,y+height/2);
    }


  function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }

  function isInside(pos, rect) {
      return (pos.x > rect.x && pos.x < rect.x + rect.width &&
          pos.y < rect.y + rect.height && pos.y > rect.y)
  }

  function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
  }

  function drawline(x1,y1,x2,y2, color){
    context.beginPath();
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);
    context.strokeStyle = color;
    context.stroke();
    context.closePath();
  }


  function deleteWindow(dButton,rect){
    context.fillStyle = "lightcoral";
    context.fillRect(dButton.x,dButton.y,dButton.width,dButton.height);
    AddDeletionEvent(dButton, rect);
    drawline(dButton.x+3,dButton.y+3,dButton.x+dButton.width-3,dButton.y+dButton.height-3, "white");
    drawline(dButton.x+dButton.width-3,dButton.y+3,dButton.x+3,dButton.y+dButton.height-3, "white");
  }
  function hideWindow(hButton,rect){
    context.fillStyle = "lightgrey";
    context.fillRect(hButton.x,hButton.y,hButton.width,hButton.height);
    AddHideEvent(hButton, rect);
    drawline(hButton.x,hButton.y+hButton.height/2,hButton.x+hButton.width,hButton.y+hButton.height/2, "white");
  }
  function menuWindow(mButton,rect){
    context.fillStyle = "lightgrey";
    context.fillRect(mButton.x,mButton.y,mButton.width,mButton.height);
    AddMenuEvent(mButton, rect);
    drawline(mButton.x,mButton.y+mButton.height/2,mButton.x+mButton.width,mButton.y+mButton.height/2, "white");
    drawline(mButton.x + mButton.width/2,mButton.y+mButton.height,mButton.x+mButton.width/2,mButton.y, "white");
  }

  function AddDeletionEvent(dButton,rect){
    canvas.addEventListener('click', function(evt) {
      var mousePos = getMousePos(canvas, evt);
      if (isInside(mousePos,dButton)) {
        context.clearRect(rect.x-1,rect.y-1,rect.width+2,rect.height+2);
      }
    }, false);
  }

  function AddHideEvent(dButton,rect){
    canvas.addEventListener('click', function(evt) {
      var mousePos = getMousePos(canvas, evt);
      if(isInside(mousePos, dButton)){
        cnt.clearRect(rect.x-1,rect.y-1,rect.width+2,rect.height+2);
      }
    }, false);
  }

  function AddAlertEvent(Button){
    canvas.addEventListener('click', function(evt) {
      var mousePos = getMousePos(canvas, evt);
      if (isInside(mousePos,Button)) {
        alert("This button is clicked");
      }
    }, false);
  }

  function AddMenuEvent(Button,rect){
    var clicked = false;
    canvas.addEventListener('click', function(evt) {
      var mousePos = getMousePos(canvas, evt);
      if (isInside(mousePos,Button)) {
        if(clicked == false){
          for(var i =0; i<rect.menuList.length; i++){
            var menu = {
              x:rect.x, y:rect.y+(rect.height+1)*(i+1), width:rect.width/2, height:rect.height,
              color:rect.color,
              text:rect.menuList[i], textColor:rect.textColor, textSize:rect.textSize, exit:false};
            createTextBox(menu);
          }
          clicked = true;
        }
        else{
          context.clearRect(rect.x,rect.y+(rect.height+1),rect.width/2+1,rect.height*(rect.menuList.length+1));
          clicked = false;
        }
      }
    }, false);
  }


    Array.prototype.remove = function(from, to) {
      var rest = this.slice((to || from) + 1 || this.length);
      this.length = from < 0 ? this.length + from : from;
      return this.push.apply(this, rest);
    };
    function Node(data) {
      this.data = data;
      this.Childnum = 0;
      this.parent = null;
      this.children = [];
    }
    function Create_root(){
      var data = {id:0,name:'root',
                  graphic:{x:0,y:0,width:100,height:50, color:'dodgerBlue'}};
  	  var root = new Node(data);
      return root;
    }
    function Add_node(data, root){
  	  var node = new Node(data);
      root.children.push(node);
      node.parent = root;
      root.Childnum += 1;
      while(root.parent != null){
        root = root.parent;
        root.Childnum += 1;
      }
    }
    function Search_node(node,id){
      if(node.data.id == id){
    	  return node;
      }
      else if(node.children.length > 0){
    	  var i;
        var result = null;
        for(i = 0; result == null && i < node.children.length; i ++){
      	  result = Search_node(node.children[i], id);
        }
    	  return result;
      }
  	  return null;
    }
    function Change_node(root, id ,data){
      var node = Search_node(root, id);
      if(node == null){
    	  alert('there is no node to delete');
      }
      node.data = data;
    }
    function Delete_node(root,id){
  	  var node = Search_node(root, id);
      if(node == null){
    	  alert('there is no node to delete');
      }
      var parent_node = node.parent;
      for(var i = 0; i<parent_node.children.length; i ++){
    	  if(parent_node.children[i].data.id == id){
      	  break;
        }
      }
      parent_node.children.remove(i);
    }
    function Render(root){
      createTextBox(root.data.graphic);
      if(root.children.length > 0){
        var graphic = jQuery.extend({}, root.data.graphic)
        graphic.y = root.data.graphic.y + 80;
        for(var i =0; i<root.children.length; i ++){
          graphic.x = root.data.graphic.x - (parseInt((root.children[i].Childnum-1)/2) + 0.5) * 120;
          graphic.x += (i) * 120;
          graphic.text = root.children[i].data.name;
          if('graphic' in root.children[i].data){
            graphic.color = root.children[i].data.graphic.color;
          }
          root.children[i].data.graphic = graphic;
          drawline(root.data.graphic.x+root.data.graphic.width/2,
                   root.data.graphic.y+root.data.graphic.height,
                   graphic.x + graphic.width/2,
                   graphic.y);
          Render(root.children[i]);
        }
      }
    }
    
function renderGraphic(node) {
  if (node.data.type == 'window') {
    createWindow(node);
  } else if (node.data.type == 'button') {
    createButton(node);
  } else if (node.data.type == 'text') {
    createTextBox(node);
  } else if (node.data.type == 'menu') {
    createMenu(node);
  }
}

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

function creationWindow(node) {
  var g = node.data.graphic;
  init(node);
  drawline(g.context,g.x, g.y + g.lineHeight, g.x + g.width, g.y + g.lineHeight, "dimgrey");
}

function creationTextBox(node) {
  var g = node.data.graphic;
  init(node);
}

function creationButton(node) {
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

function creationMenu(node) {
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
