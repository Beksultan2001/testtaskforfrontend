import React, { useState,useEffect} from 'react'
import { Grid } from '@material-ui/core'
import { Module, List, Setting } from './components'
import favourite from 'data/favourite'
import { sortBy, useToggle, useInput, useTitle } from 'utils';
import { useGlobalContext } from '../../Context';
import { makeStyles } from '@material-ui/styles';
import {IoIosArrowBack} from 'react-icons/io';
import './index.css';
import { FormatAlignJustify } from '@material-ui/icons';

const moduleLayout = {
  xs: 12,
  sm: 6,
  md: 4,
  lg: 3,
  xl: 3
}

const listLayout = {

  xs: 12,
  sm: 12,
  md: 12,
  lg: 6,
  xl: 6

}

const useStyles = makeStyles(theme => ({

  test: {
    textAlign: 'center',
    letterSpacing: '1px',
  },
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
 
}))

function Home () {
  
  const [sortValue, setLSortValue] = useState('')
  const {toggle, setToggle} = useToggle()
  const [searchValue, setSearchValue] = useInput()
  useTitle('Documentaries | Valley');
  // const {data,setData} = useGlobalContext();
  const [dataList,setDataList] = useState([]);
  const [loading,setLoading] = useState(true);
  const [pageNumber,setPageNumber] = useState(1);
  const classes = useStyles();
  const [listNumber,setListNumber] = useState([]);
  const amountPage = 5;


  const getData = () =>{

    setLoading(true);

    try{
      
      fetch(`${searchValue.length > 1 ? `https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query='${searchValue}'` : `https://api.themoviedb.org/3/discover/movie?page=${pageNumber}&sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c` }`)
        .then((t) => t.json())
        .then((k)=>{ 

          setDataList(k.results)
          setLoading(false);

        });


    }catch(e){
      setLoading(false);
        console.log(e);
    }


}

const setAmountPage = () =>{


  const num = [];

  for(let i = 0; i< amountPage; i++){

    num.push(i);
  
  };

  setListNumber(num);

}


useEffect(() =>{

  getData();
  setAmountPage();

},[searchValue,pageNumber]);

const controlPage = (number) =>{

  if(pageNumber !== number){

    setPageNumber(number)

  }

}
const leftPage = () =>{

  if(pageNumber > 1){

    setPageNumber(pageNumber - 1)
  }

}
const rightPage = () =>{

  if(pageNumber < amountPage - 1){

    setPageNumber(pageNumber + 1)
  }

}


  const props = {
    toggle,
    setToggle,
    searchValue,
    setSearchValue,
    setLSortValue
  }


  const layout = toggle ? listLayout : moduleLayout
  // const documentaries = sortBy(dataList.filter(({docTitle}) => docTitle.toLowerCase().includes(searchValue.toLowerCase())), (a, b) => b[sortValue] - a[sortValue])

  if(loading){

    return (
      <>
          <Setting {...props}/>
          <h1 className={classes.test}>Loading...</h1>
          
      </>

    )

  }else if(dataList.length < 1){
       return ( <>
          <Setting {...props}/>
          <h1 className={classes.test}>There is no items</h1>
        </>
       )
  }
  else{
    return (
      <>
        <Setting {...props}/>
        <Grid container spacing={4}>

          {dataList.map((documentary, key) => {

            if(key < 8){

              return (
                <Grid item key={key} {...layout}>
                  <Module each = {documentary}/>
                </Grid>
              )
              }

            })}
        </Grid>
        <div className = "pagination">
            <span onClick = {leftPage} className = {pageNumber <= 1 ? "move active" : "move"}>
              <i className="fas fa-chevron-left"></i>
            </span>

            <ul>
                {
                  listNumber.map((t) =>{

                    if(t != 0){

                      return (
                        <li onClick = {() => controlPage(t)} className =  {`${pageNumber==t ? 'each active' : 'each'}`}>
                          {t}
                        </li>
                      )

                    }
                  })
                }

            </ul>
            <span onClick = {rightPage} className = {(amountPage - 1 <= pageNumber) ? "move active" : "move"}>
              <i className="fas fa-chevron-right"></i>
            </span>
      </div>
      </>
    )
  }

}

export default Home