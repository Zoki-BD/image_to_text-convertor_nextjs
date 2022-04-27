import '../styles/globals.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Component {...pageProps} />
    </>

  )

}

export default MyApp
