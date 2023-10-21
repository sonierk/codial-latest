push the code to github.com
1. git remote add origin https://github.com/sonierk/codeial.git , git branch -M main , git push  origin main
2. If there is issue commiting the code in the remote repository, generate a token via the developer setting and set the remote url via the below format:
git remote set-url origin https://<githubtoken>@github.com/<username>/<repositoryname>.git
3. then run, git push -u origin main



1. create index.js and npm init.
2. mkdir routes controllers views models config assets
3. npm install express, require('express') in index.js, app = express(), port= 8000, app.listen()
4. In script, add "start":     nodemon index.js define in package. json file(npm start)
5. git init, add the node_module to the .gitignore file.
6. in Routes folder, create index.js which will redistibute the traffic to other routes.(using express router). In this index.js, require express and define express.router() function. Then export the router in the same file.
7. app.use('/', require('./routes')) in the  entry point index.js which will redirect the req to the routes folder where it will further redirct to the confroller fuction against each routes.
8. Now we need to make an action inside the controller for each routes.
example: app.use

9. create home_cotroller.js and module.exports.home = function(req,res){action}
10. In the routes folder/index.js, require the home controller, (const homeController = require('../controllers/home_controller'))
11. Now router.get('/',homeController.home) in the route/index.js(router.get('/',homeController.home);)
12. create another controller call users_controllers.js, setup create users_cotroller.js and module.exports.profile = function(req,res){action}
13. In the routes folder create users.js, require the home controller, (const usersController = require('../controllers/users_controller'))
14. Now in the index.js of the router folder add - router.use('/users',require('./users)) which will route to the users.js
15. Then in the users.js --
        const usersController = require('../controllers/users_controller')
        router.get('/profile',usersController.profile);

        // Views ejs - https://expressjs.com/en/5x/api.html#app.set
16. npm install ejs > app.set('view engine', 'ejs) > app.set('views', './views') 
17.  In views > create home.ejs. In the controller.home modify the code to render the home.ejs and use a callback function to define the 'title'    



4. PARTIALS: Create partials "_header.ejs" and  '_footer' in the views folder. and inclue in the main ejs file using the 'include'(ejs use Layouts)
5. LAYOUTS: install npm install express-ejs-layouts and create a file call layout.ejs in the views folder.
6. const expressLayouts = require('express-ejs-layouts'); in the index.js file.
7. copy the layout of the static header footer and body to the layout.ejs file then it will wrap the users.ejs and home.ejs with the layout.ejs file.
8.  Setup static file(js css), create a ./assets and link in the index.js using the app.use(express.static('./assets')) function. mkdir ./assets css js images.
9. create layout.css and link it with the ejs file.
10. // extract style and scripts of some pages into the layout
        app.set('layout extractStyles', true);
        app.set('layout extractScripts', true);
        then inclue <%- style %> and <%- script%>  in the layout.ejs  file. 
11. npm install mongoose; create mongoose.js in the config folder coenntion and config defined
12. required db in the index.js file.


Authentication
For   manual-local-auth branch.
                - Create user = sign up
                - create session = sign in 
                - show details of signed in users in user on profile page
                - sign out
1. Create a user schema in the models folder. - user.js
2. create user_siginup.ejs and user_signin.ejs and code the sign in and sign up form accordingly
3. create 2 controller for signIn and signUp. then create 2 routes for the same.
4. npm install cookie-parser - a middleware to parse the cookie data.
5. requier the cookie parser and urlencoded middleware in the index.js entry file and also app.use it in the middleware section.
6. create the controller.create for sign up and create the route as well /create

for passport auth/master branch.

1. install passport and passport-local
2. create a passport-local-strategy.js in the config folder
3. npm install express-session and require it in the index.js
4. required passport and ./config/passport-local-strategy
5. Add middleware - app.use(session(
6. app.use(passport.initialize()); and app.use(passport.session()); in the index.js entry file
7. modyfy user routes for router.post('/create-session',
8. 2 passport funtions are crealted - checkAuthentication and setAuthenticatedUser
9. then modify the router.get('/profile',passport.checkAuthentication,usersController.profile); to check for authentication before forqarding the access to profile page.
10. restrict sign in and sign up page when already signed in.Then can be done by putting a condition in the signin and signup controller using the isAuthenticated function of the password.
11. save the cookies info in the database usig the mongo store butfirst install npm install connect-mongo
12. Add store: new MongoStore()  in the app.use(session) function, mongo store is use to store session cookies in the db and define store in the index.js  file
13. const MongoStore = new require('connect-mongo'); and mongoUrl: 'mongodb://localhost/codeial_development', is modified as the code given in the video does not work.
14. make the sign in and sign up page not accessibale when user is already signed in.
15. Create a destroy function to destroy the session/ req.logout()  need to have a call back function
16. Create the route for the sign out funtion and modify the header.ejs file to conditionally show the sign out option when account is signed in.

css and design
1. npm install node-sass-middleware and require it in the index file
2. app.use the middleware as describe in the documentation.
3. move the .css files into the scss folder and rename the css to scss.
4. refer to https://codepen.io/Shtam3x/pen/QRyyLW to design the page.


Database Relations (Posts, Comments)
1. in the model folder, create post.js file
2. Define the schema of the comments in the post.js file
3. create a form in the home ejs file to add comments
4. saving post to database.- create a post controller file and implement a function to enter the comments in the db, also create a route file for the post and update the route in the index.js of the routes folder.
5. in the home controller, modify the function to populate the user and comment in the home.ejs 
6. Modify home.ejs to let only authenticated user to post comment. Put a condition in the home.ejs if locals.user exists
7. Also, put a router of the postcontroller to checkauthentication
8. create a model for comment and also include the comment schema in the post schema since post will need to display the comments as well. 
9. Create a form for comment 
10. create a comment controller and route - getting error in posting comment sin the posts. - error rectified after declaring the comment attribute in the post.js as a [array]
11. Modify home controller to populate comment using the populate function. and then update the home ejs file to show the  comments of each posts.

Deleting post
1. Write a controllor to delete the post in the post controller file
2. put in a router for the destroy function and create  delete option.
3. Commiting the code

Deleting a comment
1. in the comment controller define the action
2. create a router
3. add an achor to call teh router for deleting the comments.
4. commit the code

Create partial to brekup post and comments ejs file and include to each other.
1. create _post.ejs and _comment.ejs under views and move the post and comments section of the code as partial to each file and include the _post.ejs and _comment.ejs.
<<<<<<< HEAD


Update profile (U of CRUD)      
1. Created a list in home.ejs to display the list of users.
2. modified the home controller to find and dispaly the user 
3. update the user route to fetch the user as per the id.

Async await & error handling
1. Change the controllers to async and await code. and use try catch for error handling = pending 
2. if callback i only one level we can leave it as it is.

Flash message
1. install connect-flash
2. require it in the entry file index.js and use it just below the authentication
3. flash the message as req.flash('') in the controller before return statement.
4. Create a middleware in config folder.
5. modified the layout file to display the noty message and alos add the cnd for noty in the index file.
6. for each controll define the success/error message with req.flash('success/error',"message")

Converting to Ajax
1. jquery cdn https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js added to the layout.ejs
2. create a home_posts.js file in the assets/js folder and create a ajax function to create a post.
3. then in the post controller, add a check in the xhr(XML HTTP RESPONSE) and retrun the status code 200.

File upload
1. npm instll multer and add enctype in the form 
2. export multer in the user.js models and define the folder where the avatar would be stored.
3. 


need to fix the user update call back function and file upload as well.
=======
>>>>>>> parent of ec0d6f5 (fixed the profile update issue)