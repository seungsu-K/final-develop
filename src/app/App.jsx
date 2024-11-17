import { RouterProvider } from 'react-router-dom';

import router from '@/routes/router';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <Toaster />
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;
