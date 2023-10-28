{
    // Method to submit the form data using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form')

        newPostForm.submit((e)=>{
            e.preventDefault()

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post)
                    $('#post-list-container>ul').prepend(newPost)
                    deletePost($(' .delete-post-button', newPost))
                },
                error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }
    // Method to create the post in DOM
    let newPostDom = function(post){
        console.log(post);
        return $(`
        <li id="post-${post._id}">
        <p>
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
            </small>
    
            ${post.content} 
            <br>
            <span>
            ${post.user.name}
            </span>
        </p>

        <div class="post-comments">
                <form action="/comments/create" method="post">
                    <input type="text" name="content" placeholder="Type here to add comments.." required>
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add comments">
                </form>
    
                <div class="post-comments-list">
                    <ul id="post-comments-${post._id}">
                    </ul>
                </div>
        </div>
    </li>   
        `)
    }

    // Method to delate a post from Dom
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault()
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove()
                },
                error: function(error){
                    console.log(error.responseText);
                }
            })

        })
    }


    createPost()
}