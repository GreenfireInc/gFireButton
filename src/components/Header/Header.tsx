import React, { useState, useEffect } from 'react'
import {
  Box,
  Link,
  Flex,
  IconButton,
  HStack,
  useColorMode,
  useColorModeValue,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  MenuDivider,
  MenuGroup,
} from '@chakra-ui/react'

import { FaGithub, FaMoon, FaSun, FaBell, FaShoppingBag, FaCog, FaGlobe, FaDollarSign } from 'react-icons/fa'
import { TZBUTTON_CONTRACT } from '../../constants'
import {
  connectToBeacon,
  disconnectFromBeacon,
  getMyAddress,
  getTezBlockLinkForAddress,
  setBeaconColorMode,
} from '../../services/beacon-service'

const SettingsMenu: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [currency, setCurrency] = useState('USD')
  const [language, setLanguage] = useState('en')

  const getLanguageDisplayName = (code: string) => {
    switch (code) {
      case 'en': return 'English'
      case 'es': return 'Español'
      case 'fr': return 'Français'
      case 'de': return 'Deutsch'
      case 'pt': return 'Português'
      default: return 'English'
    }
  }

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<FaCog />}
        variant="ghost"
        aria-label="Settings"
      />
      <MenuList>
        <MenuGroup title="Theme">
          <MenuItem onClick={toggleColorMode} icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}>
            {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
          </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Language">
          <MenuItem onClick={() => setLanguage('en')} isDisabled={language === 'en'}>
            English
          </MenuItem>
          <MenuItem onClick={() => setLanguage('es')} isDisabled={language === 'es'}>
            Español
          </MenuItem>
          <MenuItem onClick={() => setLanguage('fr')} isDisabled={language === 'fr'}>
            Français
          </MenuItem>
          <MenuItem onClick={() => setLanguage('de')} isDisabled={language === 'de'}>
            Deutsch
          </MenuItem>
          <MenuItem onClick={() => setLanguage('pt')} isDisabled={language === 'pt'}>
            Português
          </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Currency">
          <MenuItem onClick={() => setCurrency('USD')} isDisabled={currency === 'USD'}>
            USD ($)
          </MenuItem>
          <MenuItem onClick={() => setCurrency('EUR')} isDisabled={currency === 'EUR'}>
            EUR (€)
          </MenuItem>
          <MenuItem onClick={() => setCurrency('GBP')} isDisabled={currency === 'GBP'}>
            GBP (£)
          </MenuItem>
          <MenuItem onClick={() => setCurrency('JPY')} isDisabled={currency === 'JPY'}>
            JPY (¥)
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}

const Header: React.FC = () => {
  const { toggleColorMode: toggleMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  const [address, setAddress] = useState<string>('')
  const [tezosPrice, setTezosPrice] = useState<number | null>(null)
  const [balance, setBalance] = useState<string>("0.00")
  const toast = useToast()

  const toggle = () => {
    toggleMode()
    setBeaconColorMode(text)
  }

  const openBlockexplorer = () => {
    window.open(getTezBlockLinkForAddress(address), '_blank')
  }

  const connect = async () => {
    try {
      await connectToBeacon()
      getMyAddress().then(setAddress)
      toast({
        title: "Wallet Connected",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const disconnect = async () => {
    try {
      await disconnectFromBeacon()
      getMyAddress().then(setAddress)
      toast({
        title: "Wallet Disconnected",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: "Disconnection Failed",
        description: "Failed to disconnect wallet",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const fetchPrices = async () => {
    try {
      const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=tezos&vs_currencies=usd")
      const data = await response.json()
      setTezosPrice(data.tezos?.usd || null)
    } catch (error) {
      console.error("Error fetching prices:", error)
      toast({
        title: "Price Fetch Failed",
        description: "Failed to fetch Tezos price",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const updateBalance = async () => {
    if (address) {
      try {
        const response = await fetch(`https://api.tzkt.io/v1/accounts/${address}/balance`)
        const balanceInMutez = await response.json()
        const balance = (balanceInMutez / 1000000).toFixed(2)
        setBalance(balance)
      } catch (error) {
        console.error("Error fetching balance:", error)
        setBalance("0.00")
        toast({
          title: "Balance Fetch Failed",
          description: "Failed to fetch wallet balance",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      }
    }
  }

  useEffect(() => {
    fetchPrices()
    const interval = setInterval(fetchPrices, 10 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    getMyAddress().then(setAddress)
  }, [])

  useEffect(() => {
    updateBalance()
  }, [address])

  const FaBellComponent = FaBell as React.ComponentType<{ size?: number }>
  const FaGithubComponent = FaGithub as React.ComponentType<{ size?: number }>
  const SwitchIconComponent = SwitchIcon as React.ComponentType<{ size?: number }>
  const FaShoppingBagComponent = FaShoppingBag as React.ComponentType<{ size?: number }>

  // Calculate the balance in USD
  const balanceInUSD = tezosPrice ? (parseFloat(balance) * tezosPrice).toFixed(2) : "0.00"

  return (
    <Flex
      w="100%"
      h="100%"
      padding="1.5rem"
      align="center"
      justify="space-between"
      borderBottom="1px"
      borderColor="gray.200"
      bg={useColorModeValue('white', 'gray.800')}
      position="sticky"
      top="0"
      zIndex="50"
    >
      <Flex alignItems="center" gap="6">
        <Link href="/" display="flex" alignItems="center" gap="2">
          <FaShoppingBagComponent size={24} />
          <Box fontSize="xl" fontWeight="bold">gFireButton</Box>
        </Link>
        
        {tezosPrice && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open('https://tzstats.com', '_blank')}
          >
            XTZ/USD: ${tezosPrice.toFixed(2)}
          </Button>
        )}
      </Flex>

      <Flex align="center" gap="4">
        <HStack spacing="2">
          <Link
            href={`https://t.me/TezosNotifierBot?start=tzbutton_${TZBUTTON_CONTRACT}_TzButton`}
            isExternal
          >
            <IconButton
              size="md"
              fontSize="lg"
              aria-label="Get notified about updates"
              variant="ghost"
              color="current"
              icon={<FaBellComponent size={20} />}
            />
          </Link>
          <Link href="https://github.com/tzbutton/tzbutton" isExternal>
            <IconButton
              size="md"
              fontSize="lg"
              aria-label="Open on GitHub"
              variant="ghost"
              color="current"
              icon={<FaGithubComponent size={20} />}
            />
          </Link>
          <IconButton
            size="md"
            fontSize="lg"
            aria-label={`Switch to ${text} mode`}
            variant="ghost"
            color="current"
            onClick={toggle}
            icon={<SwitchIconComponent size={20} />}
          />
        </HStack>

        <Menu>
          <MenuButton
            ml="3"
            as={Button}
            onClick={connect}
            variant="outline"
          >
            {address ? (
              <Flex align="center" gap="2">
                <Box>{address.slice(0, 6)}...{address.slice(-4)}</Box>
                {balance && <Box fontSize="sm">({balance} XTZ)</Box>}
              </Flex>
            ) : (
              'Connect Wallet'
            )}
          </MenuButton>
          {address && (
            <MenuList>
              <MenuItem onClick={openBlockexplorer}>
                Open Blockexplorer
              </MenuItem>
              <MenuItem onClick={disconnect}>
                Disconnect Wallet
              </MenuItem>
            </MenuList>
          )}
        </Menu>

        <SettingsMenu />
      </Flex>
    </Flex>
  )
}

export default Header 