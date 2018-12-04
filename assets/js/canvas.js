
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
