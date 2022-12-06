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
  TableContainer,
  filter,
  list
} from '@chakra-ui/react'
import { RepeatIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import Paragraph from '../components/paragraph'
import { useEffect, useState } from 'react'

// Imports for DynamoDB interactions
import { Amplify , API, graphqlOperation } from 'aws-amplify'
import { createWorkout } from '../src/graphql/mutations'
import { workoutByDate } from '../src/graphql/queries'

import awsExports from '../src/aws-exports'
Amplify.configure(awsExports)

const StyledTr = chakra(motion.Tr, {
  shouldForwardProp: prop => {
      return shouldForwardProp(prop) || prop === 'transition'
  }
})

export default function Home() {
  
  // ------ Handle Date and Time entry ------
  const current = new Date();
  const [date, setDate] = useState(0)
  const [time, setTime] = useState(0)
  const [dateT, setDateT] = useState(current.getFullYear() + '/' + addZero(current.getMonth()+1) + '/' + addZero(current.getDate()))
  const [timeT, setTimeT] = useState(addZero(current.getHours()) + ':' + addZero(current.getMinutes()) + ':' + addZero(current.getSeconds()))
  const [timer, setTimer] = useState('')

  // Add a zero to date or time if less than 10
  function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
  }

  // Updates the timer
  function timekeeper() {
    const current = new Date();
    setDate(current.getFullYear()*10000 + addZero(current.getMonth()+1)*100 + addZero(current.getDate()))
    setTime(addZero(current.getHours())*10000 + addZero(current.getMinutes())*100 + addZero(current.getSeconds()))
    setDateT(`${current.getFullYear()}/${addZero(current.getMonth()+1)}/${addZero(current.getDate())}`)
    setTimeT(`${addZero(current.getHours())}:${addZero(current.getMinutes())}:${addZero(current.getSeconds())}`)
    let dt_text = dateT + ' ' + timeT
    setTimer(dt_text)
  }
  // Timer updates every second
  setTimeout(function () {timekeeper();},1000)

  // ------ Handle Routine entry ------  
  const [routine, setRoutine] = useState('Chest')

  // ------ Handle Exercise entry ------
  const [exercise, setExercise] = useState('Bench Press')

  const chestDefaultList = {
    items: [
      { name: 'Bench Press'},
      { name: 'Shoulder Press'},
      { name: 'Dip'},
      { name: 'Chest Fly'},
      { name: 'Seated Shoulder Fly'},
      { name: 'Tricep Extension'},
      { name: 'Crunch'},
      { name: 'Leg Raise'}
  ]}

  const backDefaultList = {
    items: [
      { name: 'Deadlift'},
      { name: 'Pullup'},
      { name: 'Bentover Row'},
      { name: 'Standing Row'},
      { name: 'Rear Shoulder Fly'},
      { name: 'Bicep Curl'},
      { name: 'Bridge'},
      { name: 'Plank'}
  ]}

  const legDefaultList = {
    items: [
      { name: 'Squat'},
      { name: 'Leg Press'},
      { name: 'Lunge'},
      { name: 'Hamstring Curl'},
      { name: 'Quad Extension'},
      { name: 'Calf Raise'},
      { name: 'Hip Thrust'}
  ]}

  const [ exerciseList, setExerciseList ] = useState(chestDefaultList.items)

  function routineChanged(v) {
    setRoutine(v)
    switch (v){
      case 'Chest':
        setExerciseList(chestDefaultList.items)
        setExercise(chestDefaultList.items[0].name)
        setSet(1)
        break;
      case 'Back':
        setExerciseList(backDefaultList.items)
        setExercise(backDefaultList.items[0].name)
        setSet(1)
        break;
      case 'Legs':
        setExerciseList(legDefaultList.items)
        setExercise(legDefaultList.items[0].name)
        setSet(1)
    }
  }

  function selectExercise(e) {
    const { target } = e;
    // note: 'select-multiple' for multi select
    if (target.type === 'select-one') {
      let i = target.selectedOptions[0].value;
      setExercise(i)
      setSet(1)
    }
  }

  // ------ Handling Set entry ------
  const [set, setSet] = useState(1)
  function incrementSet() {
    // You don't need to do more than 6 sets bro
    if (set < 6) { 
      let i = set + 1
      setSet(i)
    }
  }
  function decrementSet() {
    // At least do 1 set bro
    if (set > 1) {
      let i = set - 1
      setSet(i)
    }
  }

  // ------ Handle Weight entry ------
  const [weight, setWeight] = useState(5)
  const handleweightChange = (weight) => setWeight(weight)
 
  // ------ Handle Rep entry ------
  const [rep, setRep] = useState(3)
  function incrementRep() {
    // You don't need to do more than 20 Reps bro
    if (rep < 20) { 
      let i = rep + 1
      setRep(i)
    }
  }
  function decrementRep() {
    // At least do 3 Reps bro
    if (rep > 3) {
      let i = rep - 1
      setRep(i)
    }
  }

  // Set Done button has been clicked, uploading to DynamoDB and adding a Toast for user confirmation.
  const toast = useToast()
  async function submitSet() {
    // Toasty content for user to see
    let info = 'Routine: ' + routine + ' Exercise: ' + exercise + ' Set: ' + set + ' Reps: ' + rep + ' @ ' + weight + 'kg. Date & Time: ' + timer + ' Raw: ' + date + time
    
    const formData = { 
      datetime: timer,
      time: time,
      date: date,
      routine: routine,
      exercise: exercise,
      set: set,
      weight: weight,
      rep: rep
    }
    try {
      const dataOutput = await API.graphql(graphqlOperation(createWorkout, {input: formData}))
      toast({
        title: 'Set Finished',
        description: info,
        status: 'success',
        duration: 10000,
        isClosable: true,
      })
      incrementSet()
      fetch()
    } catch ({ err }) {
      console.log('Failed: ' + err)
      console.log('Error message: ' + err.message)
      console.log('Error stack: ' + err.stack)
      toast({
        title: 'Failed to submit',
        description: info,
        status: 'error',
        duration: 10000,
        isClosable: true
      })
    }

    
  }
  
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
      // Specify to only load today's data and to sort data in descending order
      let specifics = {
        date: date,
        sortDirection: 'DESC'
      }

      // Request data with specifics *required*
      const contentData = await API.graphql(graphqlOperation(workoutByDate, specifics))

      // If no data, show the initial state instead of a blank table
      if (contentData.data.workoutByDate.items.length == 0) {
        setContents([initialState])
      }
      else {
        setContents(contentData.data.workoutByDate.items)      
      }
    }
    catch (err) {
      console.log('1. Error fetching contents: ' + err)
      console.log('2. Error message: ' + err.message)
      console.log('3. Error stack: ' + err.stack)
      console.log(err)
    }

  }

  return (
    <Layout>
      <Container maxW="container.md">
        <Section delay={0.1}>
          <Divider my={6} />
          {/* <Heading
            as="h3"
            variant="section-title"
            fontSize="20"
            marginTop="3"
            marginBottom="4"
          >
            It's fucking time to WORKOUT
          </Heading> */}
        </Section>
        <FormControl>
        <Section delay={0.2}>
          <FormLabel>Routine</FormLabel>          
          <RadioGroup onChange={routineChanged} value={routine}>
            <Stack direction='row'>
              <Radio value='Chest'>Chest</Radio>
              <Radio value='Back'>Back</Radio>
              <Radio value='Legs'>Legs</Radio>
            </Stack>
          </RadioGroup>
        </Section>
        <Stack direction='row'>
          <Section delay={0.3}>
            <FormLabel>Exercise</FormLabel>
            
              <Select  width='320px' size='md' onChange={selectExercise}>
              { exerciseList.map((item, index) => (
                <option key={index} value={item.name}>{item.name}</option>
                
              ))}
            </Select>
          </Section>
        </Stack>
        <Stack direction='row'>
        <Section delay={0.4}>
          <FormLabel>Set</FormLabel>
          <HStack maxW='320px'>
            <Button onClick={decrementSet}>-</Button>
            <Button width='220px' variant='outline'>{set}</Button>
            <Button onClick={incrementSet}>+</Button>
          </HStack>
        </Section>
        </Stack>
        <Stack direction='row'>
          <Section delay={0.5}>
            <FormLabel>Weight (kg)</FormLabel>
            <NumberInput size='md' width='320px' value={weight} onChange={handleweightChange}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Slider
              flex='1'
              focusThumbOnChange={false}
              value={weight}
              onChange={handleweightChange}
              maxW='320px'
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb fontSize='sm' boxSize='32px' children={weight} />
            </Slider>
          </Section>
        </Stack>
        <Section delay={0.6}>
          <FormLabel>Reps</FormLabel>
          <HStack maxW='320px'>
            <Button onClick={decrementRep}>-</Button>
            <Button width='220px' variant='outline'>{rep}</Button>
            <Button onClick={incrementRep}>+</Button>
          </HStack>
        </Section>
        <Section delay={0.7}>
          <Button width='260px' type='submit' onClick={submitSet}>Set Done</Button>
          <Button marginLeft='20px' width='40px' type='submit' onClick={fetch}><RepeatIcon /></Button>           
        </Section>
        </FormControl>
        <Section delay={1.9}>
        <TableContainer>
          <Table variant='striped' colorScheme='gray' size='sm'>
              <TableCaption>
                {/* { status } */}
              </TableCaption>
              <Thead>
              <Tr>
                  {/* <Th>Date</Th>
                  <Th>Time</Th> */}
                  <Th>Exercise</Th>
                  <Th>Set</Th>
                  <Th>Weight</Th>
                  <Th>Reps</Th> 
              </Tr>
              </Thead>
              <Tbody>
                  { contents.map((content, index) => ( 
                      <Tr key={index}>
                          {/* <Td>{ content.date }</Td>
                          <Td>{ content.time }</Td>  */}
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
        <Section delay={0.8}>
          <Paragraph>{timer}</Paragraph>
          <Paragraph>
            Date and time will be auto recorded for visualising the data later, whenever I get to it.
          </Paragraph>
        </Section>
      </Container>
    </Layout>
  )
}
