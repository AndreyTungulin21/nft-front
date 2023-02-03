
import { Provider } from "react-redux";
import { store } from "@src/store";

import Head from "next/head";
import Navbar from "@components/Navbar/Navbar";
import Sidebar from "@components/Sidebar/Sidebar";

import '/styles/variables.scss'
import '/styles/globals.scss'
import '/styles/common.scss'
import '/styles/navbar.scss'
import '/styles/footer.scss'
import '/styles/sidebar.scss'
import '/styles/modalWallets.scss'
import '/styles/login.scss'
import '/styles/home.scss'
import '/styles/explore-collections.scss'
import '/styles/my-collections.scss'
import '/styles/cards.scss'
import '/styles/settings.scss'
import '/styles/account-profile.scss'
import '/styles/collection-profile.scss'
import '/styles/customComponents.scss'
import '/styles/create.scss'
import '/styles/edit.scss'
import '/styles/nftPage.scss'
import '/styles/inputs.scss'

import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react"
import AuthLoader from "@components/Link/AuthLoader";
import WrapApp from "@src/containers/WrapApp/WrapApp";
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from "react";

import appLogo from '@img/main/appLogo.png'

function App({
  Component,
  pageProps: { session, ...pageProps }
}) {

  const [queryClient] = useState(() => new QueryClient())

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <WrapApp>
            <Toaster position="bottom-right" reverseOrder={false} />
            <Head>
              <title>NFT Marketplace</title>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
              <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;500;700&display=swap" rel="stylesheet" />
              <link rel="icon" href={appLogo.src} />
            </Head>
            <Navbar />
            <Sidebar />
            {Component.auth ? (
              <AuthLoader>
                <Component {...pageProps} />
              </AuthLoader>
            ) : (
              <Component {...pageProps} />
            )}
          </WrapApp>
        </SessionProvider>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
