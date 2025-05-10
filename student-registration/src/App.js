// App.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import StudentRegistration from './components/StudentRegistration/StudentRegistration';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StudentRegistration />
    </ThemeProvider>
  );
}

export default App;