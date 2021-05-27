import { Provider } from 'react-redux';
import { store } from '../store';
import Header from '../components/Header/Header';
import '../styles/globals.css';

// all pages get wrapped in this component
// render Header so all pages have Header
// provide the redux store so it's accessible by all pages

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
