import React,{useState,useEffect} from 'react';
import { useGlobalContext } from '../Context';



const Store = () =>{

    const {data,setData} = useGlobalContext();

    
    const getData = () =>{

        try{
            fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c')
            .then((t) => t.json())
            .then((k)=>console.log(k));

        }catch(e){
            console.log(e);
        }

    }

    useEffect(() =>{

        getData();

    },[]);


    return (
        <>
        </>
    )

}

export default Store;

