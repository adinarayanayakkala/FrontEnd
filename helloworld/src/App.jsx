// App.jsx
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import StudentRegistration from './StudentRegistration';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StudentRegistration />
    </ThemeProvider>
  );
}

export default App;