import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import {GlobalContext} from './context/context'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#fa4a25',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;

root.render(
  <ThemeProvider theme={theme}>
  <React.StrictMode>
  <GlobalContext>
    <App />
    </GlobalContext>
  </React.StrictMode>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
