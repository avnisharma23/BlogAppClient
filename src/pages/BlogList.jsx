import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import { Grid,Container, Tooltip,List, ListItem, ListItemText } from '@mui/material'
import Masonry from '@mui/lab/Masonry'
import BlogCard from '../components/BlogCard'
import {truncateString} from '../utils/utils'

 function BlogListPage() {
    const [myBlogs, setBlogs] = useState([]);
    const getBlogs = () => {
    const storedToken = localStorage.getItem('authToken');
        
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/blogs`, { headers: { Authorization: `Bearer ${storedToken}`}})
          .then((response) => setBlogs(response.data))
          .catch((error) => console.log(error));
      };
     
      // We set this effect will run only once, after the initial render
      // by setting the empty dependency array - []
      useEffect(() => {
        getBlogs();
      }, [] );
     
    return (
        
            <Container maxWidth="lg" sx={{py: 1, my: 1}}>
                <Grid container spacing={2}>
                    <Grid item xs={false} md={3}>
                        <List sx={{borderRadius: 5, mt: 3}}>
                            {myBlogs?.map(blog => (
                                <Link
                                    style={{textDecoration: 'none'}}
                                    to={`/blogdetails/${blog._id}`} key={blog._id}>
                                    <ListItem>
                                        <Tooltip title={blog.title} placement='right'>
                                            <ListItemText 
                                                primary={truncateString(blog.title, 30)} 
                                            />
                                        </Tooltip>
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    </Grid>


                    <Grid item xs={12} md={9}>
                        <Masonry columns={2}>
                            {myBlogs?.map(blog => (
                                <BlogCard blog={blog} key={blog._id} />
                            ))}
                        </Masonry>
                    </Grid>
                </Grid>
            </Container>
        
    )
}
 
export default BlogListPage;