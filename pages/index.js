import {
  Container, 
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
  FormLabel
} from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import Paragraph from '../components/paragraph'
import { useEffect, useState } from 'react'
import { useTime } from 'framer-motion'

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
  const [exercise, setExercise] = useState('')

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
  const toast = useToast()
  function submitSet() {
    // Set Done button has been clicked, uploading to DynamoDB and adding a Toast for user confirmation.

    let info = 'Routine: ' + routine + ' Exercise: ' + exercise + ' Set: ' + set + ' Reps: ' + rep + ' @ ' + weight + 'kg. Date & Time: ' + timer + ' Raw: ' + date + time

    toast({
      title: 'Set Finished',
      description: info,
      status: 'success',
      duration: 10000,
      isClosable: true,
    })
    incrementSet()
  }
  
  useEffect(() => {
    //console.log(date + ' ' + time)
  })
  
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
          <RadioGroup onChange={setRoutine} value={routine}>
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
              <option value='Benchpress'>Benchpress</option>
              <option value='Deadlift'>Deadlift</option>
              <option value='Squat'>Squat</option>
              <option value='Lunge'>Lunge</option>
              <option value='Hamstring'>Hamstring</option>
              <option value='Quad'>Quad</option>
              <option value='Calf'>Calf</option>
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
            {/* <Button {...decRep}>-</Button>
            <Input {...inputRep} />
            <Button {...incRep}>+</Button> */}
          </HStack>
        </Section>
        <Section delay={0.7}>
          <Button width='320px' type='submit' onClick={submitSet}>Set Done</Button>
          
        </Section>
        </FormControl>
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
