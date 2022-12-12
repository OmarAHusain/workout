import {
    Container,
    CircularProgress, 
    Divider, 
    Heading, 
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    useColorModeValue
} from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { useEffect, useState } from 'react'
import { Amplify , API, graphqlOperation } from 'aws-amplify'
import { workoutByRoutine, workoutByDate } from '../src/graphql/queries'
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
      exercise: <CircularProgress isIndeterminate size='20px' color={useColorModeValue('gray.800', 'whiteAlpha.900')}/>, 
      set: <CircularProgress isIndeterminate size='20px' color={useColorModeValue('gray.800', 'whiteAlpha.900')}/>, 
      weight: <CircularProgress isIndeterminate size='20px' color={useColorModeValue('gray.800', 'whiteAlpha.900')}/>, 
      rep: <CircularProgress isIndeterminate size='20px' color={useColorModeValue('gray.800', 'whiteAlpha.900')}/>,
  }

  
  const [chestContents, setChestContents] = useState([initialState])
  const [backContents, setBackContents] = useState([initialState])
  const [legContents, setLegContents] = useState([initialState])

  var chestInitData = ''
  var backInitData = ''
  var legInitData = ''
  var chestLastDate = '0'
  var backLastDate = '0' 
  var legLastDate = '0'
  const [chestDateTime, setChestDateTime] = useState('No Data')
  const [backDateTime, setBackDateTime] = useState('No Data')
  const [legDateTime, setLegDateTime] = useState('No Data')

  async function initFetch() {
    try {
        let chestInitSpecifics = {
            routine: 'Chest',
            sortDirection: 'DESC',
            limit: '1'
        }
        let backInitSpecifics = {
            routine: 'Back',
            sortDirection: 'DESC',
            limit: '1'
        }
        let legInitSpecifics = {
            routine: 'Legs',
            sortDirection: 'DESC',
            limit: '1'
        }
        
        chestInitData = await API.graphql(graphqlOperation(workoutByRoutine, chestInitSpecifics))
        backInitData = await API.graphql(graphqlOperation(workoutByRoutine, backInitSpecifics))
        legInitData = await API.graphql(graphqlOperation(workoutByRoutine, legInitSpecifics))

        if(chestInitData.data.workoutByRoutine.items.length != 0){
            chestLastDate = chestInitData.data.workoutByRoutine.items[0].date
            setChestDateTime(chestInitData.data.workoutByRoutine.items[0].datetime)
        }

        if(backInitData.data.workoutByRoutine.items.length != 0){
            backLastDate = backInitData.data.workoutByRoutine.items[0].date
            setBackDateTime(backInitData.data.workoutByRoutine.items[0].datetime)
        }
        
        if(legInitData.data.workoutByRoutine.items.length != 0){
            legLastDate = legInitData.data.workoutByRoutine.items[0].date
            setLegDateTime(legInitData.data.workoutByRoutine.items[0].datetime)
        }
    }
    catch (err) {
        console.log('Error fetching contents: ' + err)
        console.log('Error message: ' + err.message)
        console.log('Error stack: ' + err.stack)
        console.log(err)
    }
    fetch()      
  }

  // Refresh table
  useEffect(() => {
    initFetch()
  }, [])

  // Pull set list from DynamoDB
  async function fetch() {
    try {
       
        let chestSpecifics = {
            date: chestLastDate,
            sortDirection: 'ASC'
        }
        let backSpecifics = {
            date: backLastDate,
            sortDirection: 'ASC'
        }
        let legSpecifics = {
            date: legLastDate,
            sortDirection: 'ASC'
        }

        const chestData = await API.graphql(graphqlOperation(workoutByDate, chestSpecifics))
        const backData = await API.graphql(graphqlOperation(workoutByDate, backSpecifics))
        const legData = await API.graphql(graphqlOperation(workoutByDate, legSpecifics))

        // If dataset is empty, leave blank data line instead of aboslutely nothing
        // Otherwise show dataset
        if (chestData.data.workoutByDate.items.length == 0) {
            setChestContents([initialState])
        }
        else {
            setChestContents(chestData.data.workoutByDate.items)      
        }
        if (backData.data.workoutByDate.items.length == 0) {
            setBackContents([initialState])
        }
        else {
            setBackContents(backData.data.workoutByDate.items)      
        }
        if (legData.data.workoutByDate.items.length == 0) {
            setLegContents([initialState])
        }
        else {
            setLegContents(legData.data.workoutByDate.items)      
        }

        //console.log(contentData.data.workoutByRoutine.nextToken)
    }
    catch (err) {
      console.log('Error fetching contents: ' + err)
      console.log('Error message: ' + err.message)
      console.log('Error stack: ' + err.stack)
      console.log(err)
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
                        Last Chest Dataset - { chestDateTime }
                    </Heading>
                </Section>
                <Section delay={0.2}>
                    <TableContainer>
                        <Table variant='striped' colorScheme='gray' size='sm'>
                            <TableCaption>
                                {/* { status } */}
                            </TableCaption>
                            <Thead>
                            <Tr>
                                {/* <Th>Date & Time</Th>
                                <Th>Routine</Th> */}
                                <Th>Exercise</Th>
                                <Th>Set</Th>
                                <Th>Weight</Th>
                                <Th>Reps</Th> 
                            </Tr>
                            </Thead>
                            <Tbody>
                                { chestContents.map((content, index) => ( 
                                    <Tr key={index}>
                                        {/* <Td>{ content.datetime }</Td>
                                        <Td>{ content.routine }</Td> */}
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
                <Section delay={0.3}>
                    <Divider my={6} />
                    <Heading
                        as="h3"
                        variant="section-title"
                        fontSize="20"
                        marginTop="3"
                        marginBottom="4"
                    >
                        Last Back Dataset - { backDateTime }
                    </Heading>
                </Section>
                <Section delay={0.4}>
                    <TableContainer>
                        <Table variant='striped' colorScheme='gray' size='sm'>
                            <TableCaption>
                                {/* { status } */}
                            </TableCaption>
                            <Thead>
                            <Tr>
                                {/* <Th>Date & Time</Th>
                                <Th>Routine</Th> */}
                                <Th>Exercise</Th>
                                <Th>Set</Th>
                                <Th>Weight</Th>
                                <Th>Reps</Th> 
                            </Tr>
                            </Thead>
                            <Tbody>
                                { backContents.map((content, index) => ( 
                                    <Tr key={index}>
                                        {/* <Td>{ content.datetime }</Td>
                                        <Td>{ content.routine }</Td> */}
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
                <Section delay={0.5}>
                    <Divider my={6} />
                    <Heading
                        as="h3"
                        variant="section-title"
                        fontSize="20"
                        marginTop="3"
                        marginBottom="4"
                    >
                        Last Legs Dataset - { legDateTime }
                    </Heading>
                </Section>
                <Section delay={0.6}>
                    <TableContainer>
                        <Table variant='striped' colorScheme='gray' size='sm'>
                            <TableCaption>
                                {/* { status } */}
                            </TableCaption>
                            <Thead>
                            <Tr>
                                {/* <Th>Date & Time</Th>
                                <Th>Routine</Th> */}
                                <Th>Exercise</Th>
                                <Th>Set</Th>
                                <Th>Weight</Th>
                                <Th>Reps</Th> 
                            </Tr>
                            </Thead>
                            <Tbody>
                                { legContents.map((content, index) => ( 
                                    <Tr key={index}>
                                        {/* <Td>{ content.datetime }</Td>
                                        <Td>{ content.routine }</Td> */}
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