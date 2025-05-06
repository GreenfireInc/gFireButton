import React from 'react'
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  Image,
  useColorModeValue,
  Flex,
  Button,
  Divider,
  HStack,
  useColorMode,
} from '@chakra-ui/react'
import { FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa'
import type { IconType } from 'react-icons'
import Beacon from '../../logos/beacon-logo.svg'
import AirGap from '../../logos/airgap-logo.svg'

interface SocialLinkProps {
  icon: IconType
  href: string
  label: string
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon: Icon, href, label }) => {
  const IconComponent = Icon as React.ComponentType<{ size?: number }>
  return (
    <Button
      as="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variant="ghost"
      size="sm"
      leftIcon={<IconComponent size={20} />}
    >
      {label}
    </Button>
  )
}

const Footer: React.FC = () => {
  const { colorMode } = useColorMode()
  const bg = useColorModeValue('gray.100', 'gray.100')
  const color = useColorModeValue('black', 'gray.800')

  return (
    <Box as="footer" py={4} px={8} bg={colorMode === 'light' ? 'gray.50' : 'gray.900'}>
      <Divider mb={4} />
      <Flex justify="space-between" align="center" wrap="wrap">
        <HStack spacing={4}>
          <SocialLink
            icon={FaGithub}
            href="https://github.com/yourusername"
            label="GitHub"
          />
          <SocialLink
            icon={FaTwitter}
            href="https://twitter.com/yourusername"
            label="Twitter"
          />
          <SocialLink
            icon={FaEnvelope}
            href="mailto:your.email@example.com"
            label="Contact"
          />
        </HStack>
        <Box fontSize="sm" color="gray.500">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </Box>
      </Flex>
    </Box>
  )
}

export default Footer
