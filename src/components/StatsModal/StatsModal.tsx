import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  Text,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  useColorMode,
  Divider,
} from '@chakra-ui/react';
import { useVisitorStats } from '../VisitorCounter/VisitorCounter';
import VisitorCounter from '../VisitorCounter/VisitorCounter';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StatsModal: React.FC<StatsModalProps> = ({ isOpen, onClose }) => {
  const { stats } = useVisitorStats();
  const { colorMode } = useColorMode();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Visitor Statistics</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={6} align="stretch">
            <Box textAlign="center" py={4}>
              <VisitorCounter />
            </Box>
            
            <Divider />

            <StatGroup>
              <Stat>
                <StatLabel>Today</StatLabel>
                <StatNumber>{stats.daily.toLocaleString()}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>This Week</StatLabel>
                <StatNumber>{stats.weekly.toLocaleString()}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>This Month</StatLabel>
                <StatNumber>{stats.monthly.toLocaleString()}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>This Quarter</StatLabel>
                <StatNumber>{stats.quarterly.toLocaleString()}</StatNumber>
              </Stat>
            </StatGroup>

            <Divider />

            <Box>
              <Text fontSize="lg" fontWeight="semibold" mb={4}>
                Visitor Locations
              </Text>
              <VStack align="stretch" spacing={2}>
                {Object.entries(stats.locations)
                  .sort(([, a], [, b]) => b - a)
                  .map(([location, count]) => (
                    <HStack key={location} justify="space-between">
                      <Text>{location}</Text>
                      <Text fontWeight="bold">{count.toLocaleString()}</Text>
                    </HStack>
                  ))}
              </VStack>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default StatsModal; 