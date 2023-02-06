# Blog Application - Client

## Description

In Blog App , User can signup and create Blog. User have faciltiy to update and delete the blog.Created blog list is available.

## User Stories

-  **Create Blog:** As a user I can create an Blog.
-  **Update Blog:** As a user I can update my Blog.
-  **Delete Blog:** As a user I can delete my Blog.
-  **Blog List:** Looged in User have right to see all blogs.
-  **Comment :** Logged in User can comment on any blogs.



<br>

# Client / Frontend

## React Router Routes (React App)
| Path                      | Pages                   | Permissions | Behavior                                                     |
| ------------------------- | --------------------           | ----------- | ------------------------------------------------------------ |
Page                                        |
| `/signup`                 | Signup                     | anon only  `<IsAnon>`    | Signup form, link to login, navigate to home page after signup |
| `/login`                  | Login                      | anon only `<IsAnon>`     | Login form, link to signup, navigate to home page after login  |
| `/logout`                 | n/a                            | user only `<IsPrivate>`  | Navigate to landing page 
| `/newblog`                 | NewBlog                         | user only `<IsPrivate>`  |Navigate to Create blog page 
| `/bloglist`                 | BlogList                         | user only `<IsPrivate>`  |Navigate to blog list page 
| `/blogdetails`                 | BlogDetail                         | user only `<IsPrivate>`  |Navigate to Blog detail page,Update and Delete button is present.
<br>
          
## Components
- BlogCard
- NavBar
-Comment Card

## Backlog

- Add Admin User - Admin user can delete blogs.
- Video upload - User can upload Video.


## Authentication

- Authenticatin with JWT
  - authenticateUser

  ## Theme
    - Theme - theme.js : 
  
<br>


## API Endpoints (backend routes)

| HTTP Method | URL                         |              |
| ----------- | --------------------------- | ---------------------------- 
| POST         | `/api/blog    `           |
| GET         | `/api/bloglist    `           |      |          
| PUT         | `/api/blogdetails    `           |                       
| POST        | `/auth/signup`                | 
| POST        | `/auth/login`                 | 
| POST        | `/auth/logout`                | 
| GET        | `/auth/verify`                | 
| 


<br>


### Git

[Blog Aplication Client repository](https://github.com/avnisharma23/BlogAppClient)

[Blog Application Server repository Link](https://github.com/avnisharma23/BlogAppServer)

[Deployed App Link](https://avni-blog-app.netlify.app/)

### Slides

[Blog Application Slides](https://docs.google.com/presentation/d/1aXnO0uhiK3YvWUEyb6X4wClaK42vBWT2SaLctu8Arpg/edit#slide=id.p)
