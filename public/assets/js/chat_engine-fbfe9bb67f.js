class chatEngine{constructor(e,s,o){this.chatBox=$(`#${e}`),this.userEmail=s,this.userName=o,this.socket=io.connect("http://localhost:5000"),this.userEmail&&this.connectionHandler()}connectionHandler(){let e=this;this.socket.on("connect",(function(){console.log("Connection established from front End"),e.socket.emit("join_room",{user_name:e.userName,user_email:e.userEmail,chatRoom:"codeial"}),e.socket.on("user_joined",(function(e){console.log("User joined the chatroom",e)})),$("#message-send").click((function(s){s.preventDefault();let o=$("#message-input").val();""!=o&&($("#message-input").val(""),e.socket.emit("send_message",{user_name:e.userName,user_email:e.userEmail,message:o,chatRoom:"codeial"}))})),e.socket.on("message_received",(function(s){let o='<br> <div class = "messageContent';e.userEmail!=s.user_email?o+=' otherMessage"> <small class = "messageUser">'+s.user_name+"</small>":o+=' selfMessage">',o+='<p class = "messageStyle">'+s.message+"</p></div>",e.chatBox.append(o);let t=document.getElementById("messages");t.scrollTop=t.scrollHeight}))}))}}