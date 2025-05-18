import React from 'react'
import './App.css'
import { ChakraProvider, CSSReset, Stack } from '@chakra-ui/react'
import { theme } from '@chakra-ui/theme'

import Header from './components/Header/Header'
import Body from './components/Body'
import HowTo from './components/HowTo/HowTo'
import Faq from './components/Faq/Faq'
import Footer from './components/Footer/Footer'

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Header />
      <Stack minH="90vh">
        <Body />
        <HowTo />
        {/* <Faq /> */}
      </Stack>
      <Footer />
    </ChakraProvider>
  )
}

export default App
