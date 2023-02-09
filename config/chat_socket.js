const HomeChat = require('../models/homeChat');
const User = require('../models/user');

module.exports.chatSocket = function(socketServer){
    
    let io = require('socket.io')(socketServer, {
        cors : {
            origin : 'http://localhost:8000'
        }
    });//this io has all the sockets
    io.sockets.on('connection', function(socket){//now whenever this connection happend, it send an acknowledgement to the front end with a connect event that we have handled in class member function
        console.log("new connection recieved", socket.id);//the line, this.socket = io.connect('http://localhost:5000'); from front end fires an event connection asking server to connect
        socket.on('disconnect', function(){
            console.log("Socket Disconnected");
        })

        socket.on('join_room', function(data){
            console.log('joining request Receieved', data);

            socket.join(data.chatRoom);//joining a socket to the chatRoom
            io.in(data.chatRoom).emit('user_joined', data);//io.in makes sure fir ethe event user_joined only in the passed chatRoom
        
        });

        socket.on('send_message', async function(data){
                console.log('message recieved at server, sending it to front end', data);
                let user = await User.findOne({email : data.user_email}).select('-password');
                let mess = await HomeChat.create({
                    content : data.message,
                    user : user._id
                });
                io.in(data.chatRoom).emit('message_received', data);
        });
        
    });
}
