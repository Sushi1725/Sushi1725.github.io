function button(){function t(t,i){return Object.assign(i,t)}var i=0,s=0,e=0,o=0,h=0,n=0;this.x=0,this.disabled=!1,this.y=0,this.width=0,this.height=0;var r,d={font:"sans-serif",fontSize:12,background:"#eee",color:"#000",borderRadius:5,useBorder:!(this.content="undefined"),borderWidth:1,borderColor:"#fff"};this.style={},this.hoverStyle={background:"#27f",color:"#fff"},this.clickStyle={background:"#06f",color:"#fff"},this.disabledStyle={background:"#777",color:"#aaa"},this.align=function(t,i){e=this.width/2*(t-1),o=this.height/2*(i-1)},this.place=function(t,i,s,e){this.x=t,this.y=i,this.width=s,this.height=e},this.resize=function(t,i){this.width=t,this.height=i},this.reposition=function(t,i){this.x=t,this.y=i},this.mouseInside=function(){return mouseX>h&&mouseX<h+this.width&&mouseY>n&&mouseY<n+this.height},this.onEnter=function(){},this.onExit=function(){},this.onClick=function(){},this.onHold=function(){},this.onRelease=function(){},this.draw=function(){null==r&&(r=t(this.style,d)),h=this.x+e,n=this.y+o,this.disabled||(!i&&mouseIsPressed&&this.mouseInside()&&(this.onClick(),r=t(this.clickStyle,t(this.style,d))),i&&this.mouseInside()&&(mouseIsPressed?this.onHold():(this.onRelease(),r=t(this.hoverStyle,t(this.style,d)))),s&&!this.mouseInside()&&(this.onExit(),r=t(this.style,d),document.body.style.cursor="default"),!s&&this.mouseInside()&&(this.onEnter(),r=t(this.hoverStyle,t(this.style,d)),document.body.style.cursor="pointer")),i=mouseIsPressed,s=this.mouseInside(),this.disabled&&(r=t(this.disabledStyle,d)),fill(r.background),r.useBorder?(strokeWeight(r.borderWidth),stroke(r.borderColor)):noStroke(),rect(h,n,this.width,this.height,r.borderRadius),fill(r.color),textAlign(CENTER,CENTER),noStroke(),textFont(r.font),textSize(r.fontSize),text(this.content,h+this.width/2,n+this.height/2)}}