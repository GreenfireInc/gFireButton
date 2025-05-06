import React from 'react'
import './App.css'
import { ChakraProvider, CSSReset, Stack } from '@chakra-ui/react'
import { theme } from '@chakra-ui/theme'

import Navigation from './components/Navigation/Navigation'
import Header from './components/Header/Header'
import HowTo from './components/HowTo/HowTo'
import Faq from './components/Faq/Faq'
import Footer from './components/Footer/Footer'

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Navigation />
      <Stack minH="90vh">
        <Header />
        <HowTo />
        <Faq />
      </Stack>
      <Footer />
    </ChakraProvider>
  )
}

export default App
