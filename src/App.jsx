import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { defaultTheme as theme } from './styles/themes';
import TeklaSoundLanding from './components/tekla-sound/TeklaSoundLanding.jsx';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route index element={<TeklaSoundLanding />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
