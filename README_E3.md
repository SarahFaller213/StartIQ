# README_E3

## * [LINK to the screen capture recording](https://github.com/SarahFaller213/290React-/blob/master/screenCast.mov) (There's no voice due to technical issues.)

<hr>

## * Instructions on how we can run and test your application: 

### Project setup

1. On the my app folder, run `npm install ; npm run start`

2. Go to localhost:3000 from the browser.

### Signup/Login

3. At the sign in tab, press sign up and enter the necessary information.

4. Log in, using the credentials you provided. (Or you can use the username `yeonkim121@gmail.com` and password `yeonkim121`)

### DASHBOARD 

5. The dashboard will appear; Enter some text on the dashboard, style it, and press the post button.

6. The post will appear on the bottom section. Edit doesn't work yet, but delete does.

### COMMUNITY

7. Press the community link on the navbar. The page will display unstyled user information of all users that have signed up.

### PROFILE

8. Press the profile link on the navbar. The page will display the user's university / degree / skills. If the user haven't entered the information yet, it'll appear blank.

9. Press the edit button. It'll give you three input elements to edit the profile. Pressing save will take you to the previous profile page, with the fields updated accordingly. 

### Signout

10. Singing out will take you to the Landing page, which isn't implemented yet.

<hr>

## Features you’ve implemented
  
  We have implemented writing to a database, reading from a database, delete data from a database, and sort of update the database! We can write to the database on the dashboard page and the profile page! We can delete from the databse on the dashboard as well. We can do this by deleting one of your ideas. We also read from the database on this page because it shows your old ideas that you have already posted. In the profile page you can also add to the database by adding your school, degree, and skills. In addition, signing up adds to the database as well!

  > I had some trouble reading from the database but luckily my partner had prior experience with firebase and react so she was able to help me out.  - Sarah

  > Although there were some features that took a long time, we were able to get it done. - Amy

  It took us about 8 hours to complete this excerse. 


## Entity relationship diagram
  ![](https://raw.githubusercontent.com/SarahFaller213/290React-/master/my-app/Screen%20Shot%202019-04-01%20at%2010.28.03%20PM.png)

When the user signs up, the Firebase authentication API assigns an unique ID for the user. On our Firebase database, we have a large User, Workspace "directories" that contain UID -> User, Workspace mappings. The individual fields within the JSON is as in the picture. 