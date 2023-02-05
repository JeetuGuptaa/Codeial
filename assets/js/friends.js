
// ---------------------------------Friends-----------------------------------------------------------

let toggleFriend = function(friend){
    friend.click(function(event){
        event.preventDefault();
        $.ajax({
            method : 'get',
            url : friend.attr('href'),
            success : function(data){
                if(data.data.friendsDeleted){
                    friend.text('Add Friend');
                }
                else{
                    friend.text('Remove Friend');
                }
            },
            error : function(err){
                console.log(err);
            }
        });
    });
}
    
toggleFriend($('#toggleFriend'));

let removeFriend = function(friend){
    friend.click(function(event){
        event.preventDefault();
        $.ajax({
            method : 'get',
            url : friend.attr('href'),
            success : function(data){
                $(`#friend-${data.data.friendShipId}`).remove();
            },
            error : function(err){
                console.log(err);
            }
        });
    });
}

let userFriends = $(".remove-friend");
for(let i =0;i<userFriends.length;i++){
    removeFriend(userFriends.eq(i));
}