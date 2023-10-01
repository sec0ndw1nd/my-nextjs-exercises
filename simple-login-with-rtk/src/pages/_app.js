import { Provider } from 'react-redux';
import '../styles/globals.css';
import wrapper from '../store/configureStore';

export default function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
