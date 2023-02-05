// Brackets are just for the scope
{
    //method to submit the form for new post data using Ajax
    let createPost = function(){
        let postform = $('#postForm');
        postform.submit(function(event){
            event.preventDefault();
            $.ajax({
                method : "Post",
                url : '/post/create',
                data : postform.serialize(), //The .serialize() method creates a text string in standard URL-encoded notation. It can act on a jQuery object that has selected individual form controls, such as <input>, <textarea>, and <select>: $( "input, textarea, select" ).serialize();
                success : function(data){
                    let newPost = postHTML(data.data.post);
                    $('#postContainer>ul').prepend(newPost);
                    destroyPost($(`#${data.data.post._id}>p>a.delete-post`));
                    createComment($(`#${data.data.post._id} .create-comment`));
                    createlike($(`#${data.data.post._id}>p>a.like`));
                    new Noty({
                        theme : "sunset",
                        text: "Post Published",
                        type : "success",
                        layout : "topRight",
                        timeout : 1500
                    }).show();
                },
                error : function(error){
                    console.log(error.responseText);
                    // If text or html is specified, no pre-processing occurs. 
                    // The data is simply passed on to the success handler, 
                    // and made available through the responseText property of the jqXHR object.
                }
            })
            
        });
    }

    //method to create a post in DOM
    let postHTML = function(post){
        // `variables written inside this will be replace with values if eclosed like ${variable}`
        return (`
        <li id ="${post._id}">
            <p>
                <small>User : ${post.user.name}</small>
                <br>
                ${post.content}
                <a href ="/post/destroy/${post._id}" class ="delete-post">Delete</a>
                <a href ="/user/like/toggleLike/?id=${post._id}&type=Post" class ="like">Like</a>
                <small id = 'like-${post._id}'>${post.likes.length}</small>
            </p>
            
            <form action="/comment/create" method="POST" class="create-comment">
                <textarea placeholder="Type Here..." required cols="30" rows="3" name ="content"></textarea>
                <input type='hidden' name = 'post' value ='${post._id}'>
                <button>Reply</button>
            </form>
            <ul id="comment-container-${post._id}">
            </ul>
        </li>
        `);
    }

    //method to delete post
    let destroyPost = function(deleteLink){
        deleteLink.click(function(event){
            event.preventDefault();
            let url = this.getAttribute('href');
            $.ajax({
                method : 'delete',
                url : url,
                success : function(data){
                    $(`#${data.data.postId}`).remove();
                    new Noty({
                        theme : "sunset",
                        text: "Post and respective comments Deleted",
                        type : "success",
                        layout : "topRight",
                        timeout : 1500
                    }).show();
                },
                error : function(error){
                    console.log(error.responseText);
                }
            })
        })
    }
    destroyPost($('.delete-post'));
    createPost();


    // ---------------------------------------------COMMENTS------------------------------------------------

    //method to create comment
    let createComment = function(commentForm){
        console.log(commentForm);
        commentForm.submit(function(event){
            event.preventDefault();
            $.ajax({
                method : 'post',
                url : '/comment/create',
                data : commentForm.serialize(),
                success : function(data){
                    let postCommentContainer = $(`#comment-container-${data.data.comment.post._id}`);
                    postCommentContainer.append(commentHTML(data.data.comment));
                    createlike($(`#comment-${data.data.comment._id}>a.like`));
                    destroyComment($(`#comment-${data.data.comment._id}>a.delete-comment`));
                },
                error : function(err){
                    console.log(err.responseText);
                }
            });
        });
    }

    //method to show comment
    let commentHTML = function(comment){
        return (`<li id = "comment-${comment._id}">
        <small>User : ${comment.user.name}</small>
        <br>
        ${comment.content}
        <a href ="/comment/destroy/?id=${comment._id}&author=${comment.post.user._id}" class ="delete-comment">Delete</a>
        <a href ="/user/like/toggleLike/?id=${comment._id}&type=Comment" class ="like">Like</a>
        <small id = 'like-${comment._id}'>${comment.likes.length}</small>
    </li>`)
    }

    let commentForms = $('.create-comment');
    for(let i=0;i<commentForms.length;i++){
        createComment(commentForms.eq(i));
    }

    //Method to delete comments
    let destroyComment = function(deleteComment){
        deleteComment.click(function(event){
            event.preventDefault();
            $.ajax({
                method: 'delete',
                url : deleteComment.attr('href'),
                success : function(data){
                    $(`#comment-${data.data.comment_id}`).remove();
                },
                error : function(err){
                    console.log(err.responseText);
                }
            });
        });
    }

    let commentDeleteButtons = $('.delete-comment');
    for(let i=0;i<commentDeleteButtons.length;i++){
        destroyComment(commentDeleteButtons.eq(i));
    }


// --------------------------------------LIKES--------------------------------------------

    let createlike = function(like){
        like.click(function(event){
            event.preventDefault();

            $.ajax({
                method : 'get',
                url : like.attr('href'),
                success : function(data){
                    console.log(data);
                    if(data.data.redirect){
                        window.location.href = data.data.redirect;
                        return;
                    }
                    let likeContainer = $(`#like-${data.data.Id}`);
                    let likeCount = parseInt(likeContainer.text());
                    console.log(likeContainer);
                    if(data.data.deleted){
                        console.log(likeContainer)
                        likeCount--;
                        likeContainer.text(likeCount);
                    }else{
                        console.log(likeContainer)
                        likeCount++;
                        likeContainer.text(likeCount);
                    }
                },
                error : function(err){
                    console.log(err);
                }
            });
        })
    }
    let likes = $('.like');
    console.log(likes);
    for(let i=0;i<likes.length;i++){
        createlike(likes.eq(i));
    }
}

