import {useState, useEffect} from 'react'
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Paper, Button, TextField,
  Stack
} from '@mui/material';



// #region -----------( ICONS )-------------
/* import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit' */
// #endregion -----------( ICONS )-------------

function BlogDetailPage(props) {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

    const { blogId } = useParams();
             // <== ADD
    const navigate = useNavigate()


    useEffect(() => {  
      console.log("Hello");
      const storedToken = localStorage.getItem('authToken');
      console.log("stored token",storedToken);                       // <== ADD
       axios
         .get(`${process.env.REACT_APP_API_URL}/api/blogs/${blogId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
         .then((response) => {
           /* 
             We update the state with the Blog data coming from the response.
             This way we set inputs to show the actual title and description of the project
           */
           //const oneBlog = response.data;
           console.log("Hello",response.data);
           setTitle(response.data.title);
           setContent(response.data.content);
         })
         .catch((error) => console.log(error));
       
     }, [blogId]);

   const handleSubmit = (e) => {
      e.preventDefault();
        const storedToken = localStorage.getItem('authToken');
        console.log("Stored Token",storedToken)
        //update the Blog
        const updatedBlog = {title, content}
        console.log("updated",updatedBlog);
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
    
      

    return (
        
            <Container maxWidth='md' sx={{mt: 3, mb: 5}}>
                <Paper >
                   
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

                                <Stack spacing={2} direction='row'>
                                    <Button variant='contained' onClick={handleSubmit}>Update</Button>
                                    <Button variant='outlined' sx={{color: 'primary.main'}} onClick={deleteBlog}>Delete</Button>
                                </Stack>
                            </Stack>
                    
                </Paper>
            </Container>
        
    );
}

export default BlogDetailPage