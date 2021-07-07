import React from 'react'
import ReactDOM from 'react-dom'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';
import {AppPovider} from './Context';


import './index.css'
import App from './page/App'
import * as serviceWorker from './serviceWorker'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});


ReactDOM.render(
  <ThemeProvider theme={theme}>
    <AppPovider>
      <App/>
    </AppPovider>

  </ThemeProvider>,
  document.querySelector('#root')
)

serviceWorker.register()
