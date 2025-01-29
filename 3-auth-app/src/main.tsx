import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store.ts';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';
import ThemeConfig from './theme/ThemeConfig.tsx';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeConfig>
        <App />
      </ThemeConfig>
    </BrowserRouter>
  </Provider>
);
