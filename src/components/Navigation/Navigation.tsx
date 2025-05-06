import React, { useState } from 'react'
import {
  Box,
  Link,
  Flex,
  IconButton,
  HStack,
  useColorMode,
  useColorModeValue,
  Button,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'

import { FaGithub, FaMoon, FaSun, FaBell } from 'react-icons/fa'
import { TZBUTTON_CONTRACT } from '../../constants'
import {
  connectToBeacon,
  disconnectFromBeacon,
  getMyAddress,
  getTezBlockLinkForAddress,
  setBeaconColorMode,
} from '../../services/beacon-service'

const Navigation: React.FC = () => {
  const { toggleColorMode: toggleMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  const [address, setAddress] = useState<string>('')

  const toggle = () => {
    toggleMode()
    setBeaconColorMode(text)
  }

  const openBlockexplorer = () => {
    window.open(getTezBlockLinkForAddress(address), '_blank')
  }

  const connect = async () => {
    await connectToBeacon()
    getMyAddress().then(setAddress)
  }

  const disconnect = async () => {
    await disconnectFromBeacon()
    getMyAddress().then(setAddress)
  }

  getMyAddress().then(setAddress)

  const FaBellComponent = FaBell as React.ComponentType<{ size?: number }>
  const FaGithubComponent = FaGithub as React.ComponentType<{ size?: number }>
  const SwitchIconComponent = SwitchIcon as React.ComponentType<{ size?: number }>

  return (
    <Flex
      w="100%"
      h="100%"
      padding="1.5rem"
      align="center"
      justify="space-between"
    >
      <Box alignItems="center" flexGrow={1}></Box>
      <Flex align="center" color="gray.400">
        <HStack spacing="2">
          <Link
            href={`https://t.me/TezosNotifierBot?start=tzbutton_${TZBUTTON_CONTRACT}_TzButton`}
            isExternal
          >
            <IconButton
              size="md"
              fontSize="lg"
              aria-label={`Get notified about updates`}
              variant="ghost"
              color="current"
              icon={<FaBellComponent size={20} />}
            />
          </Link>
          <Link href="https://github.com/tzbutton/tzbutton" isExternal>
            <IconButton
              size="md"
              fontSize="lg"
              aria-label={`Open on GitHub`}
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
            onClick={() => {
              connect()
            }}
          >
            {address ? address : 'Connect Wallet'}
          </MenuButton>
          {address ? (
            <MenuList>
              <MenuItem onClick={() => openBlockexplorer()}>
                Open Blockexplorer
              </MenuItem>
              <MenuItem onClick={() => disconnect()}>
                Disconnect Wallet
              </MenuItem>
            </MenuList>
          ) : (
            ''
          )}
        </Menu>
      </Flex>
    </Flex>
  )
}

export default Navigation
