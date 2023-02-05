import {useState, useEffect} from 'react'
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import CommentCard from '../components/CommentCard';
import {Container, Paper, Button, TextField,Stack} from '@mui/material';

import {AuthContext} from '../context/auth.context';
import {useContext} from 'react';

// #region -----------( ICONS )-------------
/* import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit' */
// #endregion -----------( ICONS )-------------

function BlogDetailPage(props) {

  const[blogs,setBlogs] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [comment, setComment] = useState("");
  const {user} = useContext(AuthContext);
  const { blogId } = useParams();
  const [errorMessage, setErrorMessage] = useState(undefined); 
  const [edit, setEdit] = useState(false);

             // <== ADD
    const navigate = useNavigate()
    useEffect(() => {  
      
      const storedToken = localStorage.getItem('authToken');
       axios
         .get(`${process.env.REACT_APP_API_URL}/api/blogs/${blogId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
         .then((response) => {
           /* 
             We update the state with the Blog data coming from the response.
             This way we set inputs to show the actual title and description of the project
           */
           //const oneBlog = response.data;
           setBlogs(response.data);
           setTitle(response.data.title);
           setContent(response.data.content);
           setComment(response.data.comment); // for adding comment
           if(response.data.user !== user._id)
          {
            setEdit(false);
          }
          else
          {
            setEdit(true);
          }
          
         })
         .catch((error) => console.log(error));
       // eslint-disable-next-line
     }, [blogId]);

     
            
   const handleSubmit = (e) => {
      e.preventDefault();
        const storedToken = localStorage.getItem('authToken');
        //update the Blog
        const updatedBlog = {title, content,comment}
        axios.put(`${process.env.REACT_APP_API_URL}/api/blogs/${blogId}`, updatedBlog, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(() => navigate("/bloglist"))
            .catch(err => console.log(err)) 
    } 
        
      const deleteBlog = () => {                    //  <== ADD
        // Make a DELETE request to delete the blog
        const storedToken = localStorage.getItem('authToken');
        axios
          .delete(`${process.env.REACT_APP_API_URL}/api/blogs/${blogId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
          .then(() => {
            // Once the delete request is resolved successfully
            // navigate back to the list of projects.
            navigate("/bloglist");
          })
          .catch((err) => console.log(err));
      };  
    //#Write comment
    const commentBlog = (e) => {  
      e.preventDefault();                  //  <== ADD
      // Make a comment request to delete the blog
      const storedToken = localStorage.getItem('authToken');
      const newComment = { comment, blog: blogId}
    /*   const [errorMessage, setErrorMessage] = useState(undefined); */
  
      axios.post(`${process.env.REACT_APP_API_URL}/api/comment`, newComment, { headers: { Authorization: `Bearer ${storedToken}` } })
          .then(() => {
              //setTitle("");
              //setContent("");
              //setComment("");
              //navigate(`/blogdetails/${blogId}`);
              window.location.reload();
          })
          .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
          })
    };  
    //
   
    return (
      
            <Container maxWidth='md' sx={{mt: 3, mb: 5}}>
                  
                <Paper >
                { errorMessage && <p className="error-message">{errorMessage}</p> }
                          <Stack spacing={2}>
                          
                                <TextField
                                    label='Title' name='title' value={title} 
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <TextField
                                    label='Content' name='content' value={content} 
                                    onChange={(e) => setContent(e.target.value)}
                                    multiline minRows={5} maxRows={20}
                                />
                                {/* <TextField
                                    label='Comment' name='comment' value={comment} 
                                    onChange={(e) => setComment(e.target.value)}
                                    multiline minRows={5} maxRows={20}
                                /> */}
                                
                               {!edit ?   <></>
                                  : 
                                <Stack spacing={2} direction='row'>
                                    <Button variant='contained'  onClick={handleSubmit}>Update</Button>
                                    <Button variant='outlined' sx={{color: 'primary.main'}} onClick={deleteBlog}>Delete</Button>
                                    {/* <Button variant='outlined' sx={{color: 'primary.main'}} onClick={commentBlog}>Write Comment</Button> */}
                                </Stack>
                               }
                              <Stack>
                                <TextField label='Comment' name='comment' value={comment} onChange={(e) => setComment(e.target.value)} 
                                    multiline minRows={2} maxRows={5}/>
                                  <Button variant='contained' style={{maxWidth:'130px'}} onClick={commentBlog}>Add Comment</Button>
                               </Stack>
                            </Stack>

                            {blogs &&
                              <ul>
                              {blogs.comments.map((comment) => (
                              <CommentCard key={comment._id} {...comment}/>
                                ))}
                              </ul>
                            }
                    
                </Paper>
            </Container>
        
    );
}

export default BlogDetailPage