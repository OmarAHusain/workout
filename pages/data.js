import {
    Container,
    chakra, 
    Divider, 
    Heading, 
    Radio, 
    RadioGroup, 
    Stack, 
    Select, 
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Button,
    useNumberInput,
    HStack,
    Input,
    useToast,
    FormControl,
    FormLabel,
    shouldForwardProp,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer
} from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import Paragraph from '../components/paragraph'
import { useEffect, useState } from 'react'
import { Amplify , API, graphqlOperation } from 'aws-amplify'
import { listWorkouts } from '../src/graphql/queries'
import awsExports from '../src/aws-exports'
Amplify.configure(awsExports)

const data = () => {

    // Table init and refresh
  const initialState =  
  {
      datetime: ' - ', 
      date: ' - ', 
      time: ' - ',
      routine: ' - ', 
      exercise: ' - ', 
      set: ' - ', 
      weight: ' - ', 
      rep: ' - ',
  }
  
  const [contents, setContents] = useState([initialState])

  // Refresh table
  useEffect(() => {
    fetch()
  }, [])

  // Pull set list from DynamoDB
  async function fetch() {
    try {
      const contentData = await API.graphql(graphqlOperation(listWorkouts))
      setContents(contentData.data.listWorkouts.items)
    }
    catch (err) {
      console.log('Error fetching contents: ' + err)
      console.log('Error message: ' + err.message)
      console.log('Error stack: ' + err.stack)

    }
  }

    return (
        <Layout>
            <Container maxW="container.md">
                <Section delay={0.1}>
                    <Divider my={6} />
                    <Heading
                        as="h3"
                        variant="section-title"
                        fontSize="20"
                        marginTop="3"
                        marginBottom="4"
                    >
                        Full Dataset
                    </Heading>
                    </Section>
                    <Section delay={0.8}>
                    <TableContainer>
                        <Table variant='striped' colorScheme='gray' size='sm'>
                            <TableCaption>
                                {/* { status } */}
                            </TableCaption>
                            <Thead>
                            <Tr>
                                <Th>Date & Time</Th>
                                <Th>Routine</Th>
                                <Th>Exercise</Th>
                                <Th>Set</Th>
                                <Th>Weight</Th>
                                <Th>Reps</Th> 
                            </Tr>
                            </Thead>
                            <Tbody>
                                { contents.map((content, index) => ( 
                                    <Tr key={index}>
                                        <Td>{ content.datetime }</Td>
                                        <Td>{ content.routine }</Td>
                                        <Td>{ content.exercise }</Td>
                                        <Td>{ content.set }</Td>
                                        <Td>{ content.weight }</Td>
                                        <Td>{ content.rep }</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Section>
            </Container>
        </Layout>
    )
}

export default data