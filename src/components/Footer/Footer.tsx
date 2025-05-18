import React, { useState } from 'react'
import {
  Box,
  Flex,
  Button,
  Divider,
  HStack,
  VStack,
  Text,
  useColorMode,
  Grid,
  GridItem,
  Link,
  IconButton,
} from '@chakra-ui/react'
import { FaGithub, FaTwitter, FaEnvelope, FaLinkedin, FaMedium } from 'react-icons/fa'
import type { IconType } from 'react-icons'
import StatsModal from '../StatsModal/StatsModal'
import FaqModal from '../FaqModal/FaqModal'

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
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false)

  return (
    <Box 
      as="footer" 
      py={8} 
      px={8} 
      bg={colorMode === 'light' ? 'gray.50' : 'gray.900'}
      borderTop="1px"
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
    >
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(5, 1fr)' }}
        gap={8}
        maxW="container.xl"
        mx="auto"
      >
        {/* About Section */}
        <GridItem>
          <VStack align="start" spacing={3}>
            <Text fontSize="lg" fontWeight="semibold">About gFireButton</Text>
            <Text fontSize="sm" color="gray.500">
              A continuation of the social experiment on the Tezos blockchain based on TZButton.
            </Text>
          </VStack>
        </GridItem>

        {/* Resources Section */}
        <GridItem>
          <VStack align="start" spacing={3}>
            <Text fontSize="lg" fontWeight="semibold">Resources</Text>
            <VStack align="start" spacing={2}>
              <Link href="/docs" fontSize="sm" color="gray.500" _hover={{ color: 'blue.500' }}>
                Documentation
              </Link>
              <Button
                variant="link"
                fontSize="sm"
                color="gray.500"
                _hover={{ color: 'blue.500' }}
                onClick={() => setIsFaqModalOpen(true)}
                textAlign="left"
                pl={0}
              >
                FAQ
              </Button>
              <Link href="/api" fontSize="sm" color="gray.500" _hover={{ color: 'blue.500' }}>
                API
              </Link>
              <Button
                variant="link"
                fontSize="sm"
                color="gray.500"
                _hover={{ color: 'blue.500' }}
                onClick={() => setIsStatsModalOpen(true)}
              >
                Stats & Metrics
              </Button>
            </VStack>
          </VStack>
        </GridItem>

        {/* Community Section */}
        <GridItem>
          <VStack align="start" spacing={3}>
            <Text fontSize="lg" fontWeight="semibold">Community</Text>
            <VStack align="start" spacing={2}>
              <Link href="/blog" fontSize="sm" color="gray.500" _hover={{ color: 'blue.500' }}>
                Blog
              </Link>
              <Link href="https://github.com/GreenfireInc" fontSize="sm" color="gray.500" _hover={{ color: 'blue.500' }}>
                GitHub
              </Link>
              <Link href="https://twitter.com/yourusername" fontSize="sm" color="gray.500" _hover={{ color: 'blue.500' }}>
                Twitter
              </Link>
            </VStack>
          </VStack>
        </GridItem>

        {/* Legal Section */}
        <GridItem>
          <VStack align="start" spacing={3}>
            <Text fontSize="lg" fontWeight="semibold">Legal</Text>
            <VStack align="start" spacing={2}>
              <Link href="/privacy" fontSize="sm" color="gray.500" _hover={{ color: 'blue.500' }}>
                Privacy Policy
              </Link>
              <Link href="/terms" fontSize="sm" color="gray.500" _hover={{ color: 'blue.500' }}>
                Terms of Service
              </Link>
            </VStack>
          </VStack>
        </GridItem>

        {/* Contact Section */}
        <GridItem>
          <VStack align="start" spacing={3}>
            <Text fontSize="lg" fontWeight="semibold">Contact</Text>
            <VStack align="start" spacing={2}>
              <Link href="mailto:your.email@example.com" fontSize="sm" color="gray.500" _hover={{ color: 'blue.500' }}>
                Email Us
              </Link>
              <Link href="https://linkedin.com/company/yourcompany" fontSize="sm" color="gray.500" _hover={{ color: 'blue.500' }}>
                LinkedIn
              </Link>
            </VStack>
          </VStack>
        </GridItem>
      </Grid>

      <Divider my={8} />

      {/* Bottom Section */}
      <Flex 
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align="center"
        maxW="container.xl"
        mx="auto"
      >
        <Text fontSize="sm" color="gray.500">
          © {new Date().getFullYear()} gFireButton. All rights reserved.
        </Text>

        <HStack spacing={4} mt={{ base: 4, md: 0 }}>
          <IconButton
            as="a"
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            icon={<FaGithub />}
            variant="ghost"
          />
          <IconButton
            as="a"
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            icon={<FaTwitter />}
            variant="ghost"
          />
          <IconButton
            as="a"
            href="https://linkedin.com/company/yourcompany"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            icon={<FaLinkedin />}
            variant="ghost"
          />
          <IconButton
            as="a"
            href="https://medium.com/@yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Medium"
            icon={<FaMedium />}
            variant="ghost"
          />
        </HStack>
      </Flex>

      <StatsModal
        isOpen={isStatsModalOpen}
        onClose={() => setIsStatsModalOpen(false)}
      />
      
      <FaqModal
        isOpen={isFaqModalOpen}
        onClose={() => setIsFaqModalOpen(false)}
      />
    </Box>
  )
}

export default Footer
