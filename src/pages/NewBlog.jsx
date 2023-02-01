import {useState, useContext} from 'react';

import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../context/auth.context';

import {Transition} from 'react-transition-group';
import {LoremIpsum} from 'lorem-ipsum';

import {gsap} from 'gsap';

import {
    Grid, Slider, TextField, Container,
    Button, Paper, Stack, Typography, 
    FormControlLabel, Checkbox
} from '@mui/material';




function NewBlog () {


    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    const { user } = useContext(AuthContext);

    const [onGenerate, setOnGenerate] = useState(false);
    
    const navigate = useNavigate();
    
    /*  setNewBlog({
        title: lorem.generateSentences(1),
        content: lorem.generateParagraphs(loremOptions.paragraphPerBlog)
    })  */

    const handleSave = (e) => {
        e.preventDefault();
        const storedToken = localStorage.getItem('authToken');
        const userId = user._id;
        console.log(userId);
        const newBlog = { title, content,userId}
        axios.post(`${process.env.REACT_APP_API_URL}/api/blogs`, newBlog, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then((response) => {
        // Reset the state
        setTitle("");
        setContent("");
        setErrorMessage("");
        
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
    }
    const [loremOptions, setLoremOptions] = useState({
        minWordPerSentence: 3,
        maxWordPerSentence: 16,
        wordPerSentence: 4,

        minSentencePerParagraph: 4,
        maxSentencePerParagraph: 20,
        sentencePerParagraph: 5,

        minParagraphPerBlog: 2,
        maxParagraphPerBlog: 10,
        paragraphPerBlog: 3,
    })

    const handleGenerate = () => {
        
        const lorem = new LoremIpsum({
            sentencesPerParagraph:{
                max: loremOptions.maxSentencePerParagraph,
                min: loremOptions.minSentencePerParagraph
            },
            wordsPerSentence: {
                max: loremOptions.maxWordPerSentence,
                min: loremOptions.minWordPerSentence
            }
          
        })
        //alert(JSON.stringify, lorem.generateSentences(1))
        setTitle(lorem.generateSentences(1)) ;
        setContent(lorem.generateParagraphs(loremOptions.paragraphPerBlog))
      
    }
    return (
        
            <Container maxWidth="md" sx={{py: 2, my: 1, backgroundColor: 'silver'}} component={Paper}>
                
                 <Typography component="h1" variant="h5" text-align='center'>Create Blog</Typography>
                  { errorMessage && <p className="error-message">{errorMessage}</p> }
                <Grid container spacing={2}>
                    <Grid item>
                        <FormControlLabel align='left' 
                            control={
                                <Checkbox 
                                    checked={onGenerate}
                                    onChange={() => setOnGenerate(!onGenerate)}
                                />
                            } label='Auto Generate' 
                        />
                    </Grid>
                    
                    <Transition 
                        timeout={1000} in={onGenerate} mountOnEnter unmountOnExit
                        onEntering={(node) => {
                            gsap.from(node, {
                                y: -50,
                                autoAlpha: onGenerate ? 0 : 1,
                                duration: 0.5
                            })
                        }}
                        addEndListener={(node, done) => {
                            gsap.to(node, {
                                y: onGenerate ? 0 : -50,
                                autoAlpha: onGenerate ? 1 : 0,
                                onComplete: done
                            })
                        }}
                    >
                        <Grid item xs={12} container spacing={2}>
                            <Grid item xs={12} lg={4}>
                                <Typography>Words Per Sentence</Typography>
                                <Slider  
                                    marks={[
                                        {value: loremOptions.minWordPerSentence, label: loremOptions.minWordPerSentence},
                                        {value: loremOptions.maxWordPerSentence, label: loremOptions.maxWordPerSentence},
                                    ]}
                                    min={loremOptions.minWordPerSentence} 
                                    max={loremOptions.maxWordPerSentence} 
                                    value={loremOptions.wordPerSentence}
                                    onChange={(e, value) => setLoremOptions({...loremOptions, wordPerSentence: value})}
                                />
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <Typography>Sentences Per Paragraphs</Typography>
                                <Slider  
                                    marks={[
                                        {value: loremOptions.minSentencePerParagraph, label: loremOptions.minWordPerSentence},
                                        {value: loremOptions.maxSentencePerParagraph, 
                                          label: loremOptions.maxSentencePerParagraph
                                        },
                                    ]}
                                    min={loremOptions.minSentencePerParagraph} 
                                    max={loremOptions.maxSentencePerParagraph} 
                                    value={loremOptions.sentencePerParagraph}
                                    onChange={(e, value) => setLoremOptions({...loremOptions, sentencePerParagraph: value})}
                                />
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <Typography>Paragraphs Per Blog</Typography>
                                <Slider  
                                    marks={[
                                        {value: loremOptions.minParagraphPerBlog, label: loremOptions.minParagraphPerBlog},
                                        {value: loremOptions.maxParagraphPerBlog, label: loremOptions.maxParagraphPerBlog},
                                    ]}
                                    min={loremOptions.minParagraphPerBlog} 
                                    max={loremOptions.maxParagraphPerBlog} 
                                    value={loremOptions.paragraphPerBlog}
                                    onChange={(e, value) => setLoremOptions({...loremOptions, paragraphPerBlog: value})}
                                />
                            </Grid>

                            <Grid item>
                                <Button fullWidth={false} onClick={handleGenerate}>Generate Blog</Button>
                            </Grid>
                        </Grid>
                    </Transition>







                    <Grid item xs={12}>
                        <TextField
                            label="Title" value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            multiline minRows={8} maxRows={20}
                            label="Content" value={content}
                             onChange={(e) => setContent(e.target.value)}
                        />
                    </Grid>

                    <Grid item >
                        <Stack spacing={2} direction="row">
                            <Button onClick={handleSave}>Save</Button>
                           {/*  <Button variant='outlined' onClick={e => setNewBlog({title: '', content: ''})}>Clear</Button> */}
                            <Button onClick={() => navigate('/blogs')}>Cancel</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        
    )
}
export default NewBlog;