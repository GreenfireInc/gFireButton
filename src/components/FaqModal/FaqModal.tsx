import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Container,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Image,
  Link,
  useColorMode,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react'
import { CONTRIBUTION_AMOUNT_STRING } from '../../constants'

interface FaqModalProps {
  isOpen: boolean
  onClose: () => void
}

const catImage = (
  <>
    There are:
    <br />
    <Image
      src="https://source.unsplash.com/collection/139386/"
      boxSize="200"
    ></Image>
  </>
)

const getLink = (name: string, link: string) => {
  return (
    <Link href={link} isExternal>
      {name}
    </Link>
  )
}

const airgapLink: JSX.Element = getLink('AirGap', 'https://airgap.it/')
const tzButtonGithubLink: JSX.Element = getLink(
  'TzButton GitHub',
  'https://github.com/tzbutton/tzbutton'
)

// Original AirGap FAQs
const originalFAQs = [
  {
    title: `Are there any fees?`,
    description: `The only fees are the transaction fees (gas cost to execute your transaction).`,
  },
  {
    title: `Who developed TZButton?`,
    description: (
      <>
        TZButton was developed by members of the {airgapLink} team during their
        free time.
      </>
    ),
  },
  {
    title: `Can I press the button multiple times?`,
    description: `Yes. Just keep in mind that every time the button is pressed, you will add ${CONTRIBUTION_AMOUNT_STRING()} to the balance and the countdown will be reset. So it does not make any sense to press it if you already are the leader.`,
  },
  {
    title: `How is this project funded?`,
    description: (
      <>
        This project was created on a voluntary basis during our free time. We
        don't have any direct commercial motivation.
        <br />
        <br />
        The only thing that could be considered as a commercial motivation is
        that the contracts balance is delegated to the AirGap baker. All
        resulting baking rewards will be used to support open source software.
      </>
    ),
  },
  {
    title: `Where can I find the source code of this project?`,
    description: (
      <>
        The entire project is released using the permissive MIT license, you can
        find the code on github: {tzButtonGithubLink}
      </>
    ),
  },
  {
    title: `How can I participate in the experiment?`,
    description: `In case you already have a beacon compatible wallet, you just have to press the button. In case you don't have a beacon compatible wallet yet, go and setup one.`,
  },
  {
    title: `How can I withdraw the balance?`,
    description: `When the countdown expires the current button will become the withdraw button.`,
  },
  {
    title: `If I'm the leader and the countdown expires, how quickly do I need to withdraw the balance?`,
    description: `No rush. You can take all the time you need, no one will be able to overwrite your leader position and you are the only one capable of withdrawing the funds.`,
  },
  {
    title: `Can't the contract owner withdraw the balance?`,
    description: `No. The contract does not have such a function. Only the leader can withdraw the balance once the countdown expired.`,
  },
  {
    title: `Why are there no cat pictures on this site?`,
    description: catImage,
  },
  {
    title: `Can I transfer more or less than ${CONTRIBUTION_AMOUNT_STRING()}?`,
    description: `No, the contract will not allow you to pay more or less than ${CONTRIBUTION_AMOUNT_STRING()}.`,
  },
  {
    title: `Is this dApp secure?`,
    description: (
      <>
        Probably not.
        <br />
        Don't participate if you cannot afford to lose the 0.2 tez you are
        sending to the contract.
      </>
    ),
  },
]

// Greenfire FAQs
const greenfireFAQs = [
  {
    title: `Are there any fees?`,
    description: `The only fees are the transaction fees (gas cost to execute your transaction).`,
  },
  {
    title: `Who developed gFireButton?`,
    description: (
      <>
        gFireButton is based on TZButton, which was developed by members of the {airgapLink} team during their free time. During our free time, we adapted it.
      </>
    ),
  },
  {
    title: `Can I press the button multiple times?`,
    description: `Yes. Just keep in mind that every time the button is pressed, you will add ${CONTRIBUTION_AMOUNT_STRING()} to the balance and the countdown will be reset. So it does not make any sense to press it if you already are the leader.`,
  },
  {
    title: `How is this project funded?`,
    description: (
      <>
        This project was done entirely on our freetime with the help of chatgpt, adapted from the work of the original code from the Airgap team. Our commercial motivation is to draw attention to our products such as Greenery and Techmarkets. In the future we will deploy a, with the resulting baking rewards used to support open source software we develop.
      </>
    ),
  },
  {
    title: `Where can I find the source code of this project?`,
    description: (
      <>
        The entire project is released using the permissive MIT license, you can find the code on github: {tzButtonGithubLink}
      </>
    ),
  },
  {
    title: `How can I participate in the experiment?`,
    description: `In case you already have a beacon compatible wallet, you just have to press the button. In case you don't have a beacon compatible wallet yet, go and setup one. We recommend using Greenery.`,
  },
  {
    title: `How can I withdraw the balance?`,
    description: `When the countdown expires the current button will become the withdraw button.`,
  },
  {
    title: `If I'm the leader and the countdown expires, how quickly do I need to withdraw the balance?`,
    description: `No rush. You can take all the time you need, no one will be able to overwrite your leader position and you are the only one capable of withdrawing the funds.`,
  },
  {
    title: `Can't the contract owner withdraw the balance?`,
    description: `No. The contract does not have such a function. Only the leader can withdraw the balance once the countdown expired.`,
  },
  {
    title: `Why are there no cat pictures on this site?`,
    description: catImage,
  },
  {
    title: `Can I transfer more or less than ${CONTRIBUTION_AMOUNT_STRING()}?`,
    description: `No, the contract will not allow you to pay more or less than ${CONTRIBUTION_AMOUNT_STRING()}.`,
  },
  {
    title: `Is this dApp secure?`,
    description: (
      <>
        Probably not. Don't participate if you cannot afford to lose the 0.2 tez you are sending to the contract.
      </>
    ),
  },
  {
    title: `Who?, What?, Why?`,
    description: (
      <>
        <strong>Who:</strong>
        <br />
        Greenfire, a company made up of crypto enthusiasts that are excited about the Tezos ecosystem
        <br /><br />
        <strong>What:</strong>
        <br />
        What our mandate is, is to build products that bridge the gap between the real world and the cryptocurrency ecosystem
        <br /><br />
        <strong>Why?:</strong>
        <br />
        The original TZButton was great, however it was cut short being only two rounds. This is an attempt to really see where it can go, and also its a great opportunity to draw attention to other Greenfire products, specifically Greenery, our cryptocurrency wallet. Additionally practice deploying smart contracts on the Tezos blockchain, which we will eventually use for other products.
      </>
    ),
  },
]

const FaqModal: React.FC<FaqModalProps> = ({ isOpen, onClose }) => {
  const { colorMode } = useColorMode()
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Frequently Asked Questions</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>Greenfire</Tab>
              <Tab>Original (AirGap)</Tab>
            </TabList>
            <TabPanels>
              <TabPanel p={0}>
                <Box maxW="100%" mx="auto">
                  <Accordion allowToggle>
                    {greenfireFAQs.map((faq, index) => {
                      return (
                        <AccordionItem key={index}>
                          <AccordionButton>
                            <Box flex="1" textAlign="left">
                              {faq.title}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                          <AccordionPanel pb={4}>{faq.description}</AccordionPanel>
                        </AccordionItem>
                      )
                    })}
                  </Accordion>
                </Box>
              </TabPanel>
              <TabPanel p={0}>
                <Box maxW="100%" mx="auto">
                  <Accordion allowToggle>
                    {originalFAQs.map((faq, index) => {
                      return (
                        <AccordionItem key={index}>
                          <AccordionButton>
                            <Box flex="1" textAlign="left">
                              {faq.title}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                          <AccordionPanel pb={4}>{faq.description}</AccordionPanel>
                        </AccordionItem>
                      )
                    })}
                  </Accordion>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default FaqModal 