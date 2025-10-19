import "@/styles/globals.css";
import { store } from "../../components/state/context";
import Head from "next/head";
import { Provider } from "react-redux";
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Wallet Transfer</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
