import firebase, { FirebaseContext } from '../firebase';
import useAuthentication from '../hooks/useAuthentication';
import { IconContext } from 'react-icons';

function MyApp({ Component, pageProps }) {
  const user = useAuthentication();

  return (
    <FirebaseContext.Provider value={{ firebase, user }}>
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
        <Component {...pageProps} />
      </IconContext.Provider>
    </FirebaseContext.Provider>
  );
}

export default MyApp;
