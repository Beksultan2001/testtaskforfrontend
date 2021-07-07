import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Card, CardMedia, Typography } from '@material-ui/core'
import { fade } from '@material-ui/core/styles/colorManipulator'
import LazyLoad from 'react-lazyload'
import { makeStyles } from '@material-ui/styles';
import { useParams, Link } from 'react-router-dom'



import { useHover } from 'utils'

const useStyles = makeStyles(theme => ({
  card: {
    position: 'relative',
    height: 512,
    display: 'flex',
    flexDirection: 'column',
    transition: `all 0.2s ease-in-out`,
    backgroundColor: (theme.palette.type === 'dark') ? '#333' : '#fff',
  },
  cardMedia: {
    height: '512px',
    transition: `all 0.5s ease-in-out`,
    '&:hover': {
      transform: `scale(1.1)`,
    }
  },
  cardContent: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: theme.zIndex.drawer - 1,
    backgroundColor: 'rgba(20,20,20,0.75)',
    color: '#ccc',
    fontSize: 14,
    fontFamily: 'Verdana, Arial, sans-serif',
    maxHeight: '30%',
    padding: '15px 10%',
    textAlign: 'center',
    borderTop: '1px solid rgba(255,255,255,0.2)',
    transition: `all 0.5s ease-in-out`,
  },
  cardDivider: {
    display: 'block',
    height: '1px',
    border: 0,
    borderTop: '1px solid #666',
  },
  cardLink: {
    textDecoration: 'none',
    color: fade(theme.palette.common.white, 0.55),
    '&:hover': {
      color: fade(theme.palette.common.white, 0.75),
    }
  },
  ratingCount: {
    color: fade(theme.palette.common.white, 0.55),
  }
}))

/**
 * Module
 * @type {{docResource: String, docTitle: String, docYear: String, imgTitle: String, ratingCount: String, ratingValue: String}}
 */
Module.propTypes = {
  docResource: PropTypes.string.isRequired,
  docTitle: PropTypes.string.isRequired,
  docYear: PropTypes.string.isRequired,
  imgTitle: PropTypes.string.isRequired,
  ratingCount: PropTypes.string.isRequired,
  ratingValue: PropTypes.string.isRequired
}

function Module (each) {
  const classes = useStyles()
  const [hover, setHover] = useHover()

  // const imgLink = `${process.env.PUBLIC_URL}/cover/${imgTitle}`

  useEffect(() =>{
    console.log(each.each);
  });

  return (
    <Card className={classes.card} {...setHover}>

      <Link to={`/home/${each.each.id}`} >

        <LazyLoad once={true} height={200} offset={[100, 0]} overflow={true}>
            <CardMedia className={classes.cardMedia} image={`https://image.tmdb.org/t/p/w1280${each.each.poster_path}`}/>
          </LazyLoad>

          <div className={classes.cardContent} style={{opacity: hover ? 100 : 0}}>
            <Typography>{each.each.vote_average}/10</Typography>
            <small className={classes.ratingCount}>{each.each.vote_count}</small>

            <hr className={classes.cardDivider}/>
            <a target="_blank" rel="noopener noreferrer" className={classes.cardLink}>
              <p>{`${each.each.title} (${each.each.release_date})`}</p>
            </a>
          </div>

      </Link>
    </Card>
  )
}

export default Module