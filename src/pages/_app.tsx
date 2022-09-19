// import 'rsuite/dist/styles/rsuite-dark.min.css';
import 'rsuite/dist/rsuite.min.css';
import '@/styles/rs-custom.globals.scss';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { CustomProvider } from 'rsuite';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CustomProvider theme="dark">
      <Component {...pageProps} />
    </CustomProvider>
  );
}

export default MyApp;
