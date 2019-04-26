## README for Code Base Interview.
### Author: Amy Kim , Sarah Faller

###### main contributions:
* Sarah 
    * work mostly on Community page, profile edit, sign up, sign in, UI for idea edit, creating tokens
    *  however, a lot of it was collaborative
*   Amy 
    *   Work mostly on Database integration with Firebase and UI of the app.
    *   Primarily on Dashboard with refine&edit idea and comments, Admin token generation, Mentor dashboard and Routes Navigation.

###### Attributions/ turtorial / external libraries:
* Got guidlines on how to set up authentication with email and google from : https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/#react-application-setup
* react-router-dom
* react-bootstrap
    * Modals, Cards, Forms.
* react-quill 
    * Use react-quill library with some modifications for customizing the features.

<hr>

## * Instructions on how we can run and test your application: 

### Project setup

1. On the my app folder, run `npm install ; npm run start`

2. Go to localhost:3000 from the browser or Linked to our deployed website: https://start-iq.herokuapp.com/

### Signup/Login

3. At the sign in tab, press sign up and enter the necessary information. Sign up with email and password requires tokens. Use <2019Blue> without <>. It is token code for Duke Students community. 

4. Log in, using the credentials you provided.

### DASHBOARD 

5. The dashboard will appear; Enter some text on the dashboard, style it, and press the post button.

6. The post will appear on the bottom section. You can edit/refine/delete ideas. Also, via comments, you can get feedback or ask to mentors.

### COMMUNITY

7. Press the community link on the navbar. The page will display unstyled user information of all users that have signed up.

### PROFILE

8. Press the profile link on the navbar. The page will display the user's university / degree / skills. If the user haven't entered the information yet, it'll appear blank.

9. Press the edit button. Pressing save will take you to the previous profile page, with the fields updated accordingly. 

### Signout

10. Signing out will take you to the Landing page.

### Tokens

11. Only Admin can generate Tokens to let user sign up with joining  community.
12. To log in with admin, use "admin@gmail.com" and password "DukeStartIQ"

### Refine Ideas
13. Press the refine button. You can see details of ideas, and questions that the user should fill out to help mentors understand more about the user's idea.


<hr>
