import React,{useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import {IoIosArrowBack} from 'react-icons/io';


const useStyles = makeStyles(theme => ({

    single: {
        display: 'block',
        width: '90%',
        margin: '0 auto',
    },

    main: {
        display: 'grid',
        gridTemplateColumns: '50% 50%',
        gap: '2rem',
        marginTop: '3rem',
    },
    short: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1rem',
        marginTop: '3rem',

    },
    image: {
        width: '100%',
        height: '30rem',
        objectFit: 'cover'
    },
    
    title: {
        color: 'blue',
    },
    subtitle: {
        fontWeight: '600',
        letterSpacing: '1px'
    },
    backArraw:{
        fontSize: '25px',
        fontWeight: '600',
        marginBottom: '10rem',
        cursor: 'pointer',
        color: 'white',
        '&:hover': {
            color:'blue',
         },
    }

   
  }))


const Test = () =>{

    const { id } = useParams();
    const [eachData,setEachData] = useState();
    const classes = useStyles();
    const isActive = useMediaQuery("(max-width: 800px)");

    
    const getData = () =>{

        fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c')
        .then((t) => t.json())
        .then((k) =>{

            const data = k.results.find((t) =>{
                
                return t.id == id;

            });

            setEachData(data);
            
        });
    }

    useEffect(() =>{

        getData();

    },[]);


    if(eachData){
       return(

        <div className =  {classes.single}>
            <Link to="/" className = {classes.backArraw}>
                <IoIosArrowBack />
            </Link>
            <section className = {isActive ? classes.short : classes.main}>
                <div className = "image">
                    <img src = {`https://image.tmdb.org/t/p/w1280${eachData.poster_path}`} className = {classes.image} />
                </div>
                <div className = "article">

                    <h1 className = {classes.subtitle} >Name:  <span className = {classes.title}> {eachData.title}</span></h1>
                    <h3 className = {classes.subtitle}>Ratings: <span className = {classes.title}>{eachData.vote_average}/10</span></h3>
                    <h3>
                        Count: <span className = {classes.title}>{eachData.vote_count}</span>
                    </h3>
                   <p style = {{letterSpacing: '1px'}}>
                      {eachData.overview}
                   </p>
                    <p style = {{letterSpacing: '1px',fontSize: '10px'}}>
                        {eachData.release_date}
                    </p>
                   
                </div>

            </section>
        </div>
            
       )

    }else{

        return (
            <h1 style = {{textAlign: 'center'}}>
                Loading...
            </h1>

        )
    }
    
}

export default Test;