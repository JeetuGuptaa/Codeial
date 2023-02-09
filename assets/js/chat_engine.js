//this class is going to send a request for connection to the server

//we have initialzed this class in home.ejs, since it will be easy to check if th euser is signIN
//and passing email will also be easy;

class chatEngine{
    constructor(chatBoxId, userEmail, userName){//chatboxId to select the chatbox, userEmail to know which user is connecting
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.userName = userName;

        //io is a global variable, which we got from socket.io file inclusion
        //connection to the server
        this.socket = io.connect('http://localhost:5000');

        //calling the connectionHandler, it will execute as soon as constructor execute
        if(this.userEmail){
            this.connectionHandler();
        }

    }

    connectionHandler(){
        let self = this;//since this is changed below
        //when connect event happen, we can say connection established
        this.socket.on('connect', function(){
            console.log("Connection established from front End");

            self.socket.emit('join_room', {//we have named this event as join_room we can name it anything but same should be taken care of at the backend 
                //while emitting an event we can send the data along side
                //the emit request will be taken care of by using on
                user_name : self.userName,
                user_email : self.userEmail,
                chatRoom : 'codeial'//this is the name of our chatroom, the word 'chatRoom's also defined by us
            });

            self.socket.on('user_joined', function(data){
                console.log('User joined the chatroom', data);
            });

            //send a message to the server on clickin the send button
            $('#message-send').click(function(event){
                event.preventDefault();
                let msg = $('#message-input').val();
                if(msg!=''){
                    $('#message-input').val("");
                    self.socket.emit('send_message', {
                        user_name : self.userName,
                        user_email : self.userEmail, 
                        message : msg,
                        chatRoom : 'codeial'
                    });
                }
            });

            //as soon as server receives our message, it send back the message to all the subscribers
            self.socket.on('message_received', function(data){
                let htmlContent = '<br> <div class = "messageContent';
                if(self.userEmail != data.user_email){
                    htmlContent+=' otherMessage"> <small class = "messageUser">' + data.user_name +'</small>';
                }else htmlContent += ' selfMessage">';

                htmlContent += '<p class = "messageStyle">' + data.message + '</p></div>'
                self.chatBox.append(htmlContent);
                let messageContainer = document.getElementById("messages");
                messageContainer.scrollTop = messageContainer.scrollHeight;
            })
        });
    }
}