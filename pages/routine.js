import { Container, Divider, Heading, List, ListIcon, ListItem } from "@chakra-ui/react"
import Layout from "../components/layouts/article"
import Paragraph from "../components/paragraph"
import Section from "../components/section"
import { ChevronRightIcon } from '@chakra-ui/icons'
//import chestJson from './chest.json'
import { useEffect, useState } from "react"


const routine = () => {

    // const [ chestList, setChestList ] = useState('');
    
    // useEffect(() => {
    //     setChestList(chestJson.workouts);
    // }) 
    


    return (
        <Layout>
            <Container>
                <Section delay={0.1}>
                    <Divider my={6} />
                    <Heading
                        as="h1"
                        variant="section-title"

                    >
                        Routines
                    </Heading>
                </Section>
                <Section delay={0.2}>
                    <Heading
                        as="h3"
                        variant="section-title"
                        fontSize="20"
                        marginTop="3"
                    >
                        Chest Day
                    </Heading>
                </Section>



                <Section delay={0.3}>
                    <List>
                        <ListItem>
                            <ListIcon as={ChevronRightIcon} /> Warm-up
                        </ListItem>
                        <ListItem>
                            <ListIcon as={ChevronRightIcon} /> Bench Press
                        </ListItem>
                        <ListItem>
                            <ListIcon as={ChevronRightIcon} /> Shoulder Press
                        </ListItem>
                        <ListItem>
                            <ListIcon as={ChevronRightIcon} /> Dips
                        </ListItem>
                        <ListItem>
                            <ListIcon as={ChevronRightIcon} /> Chest Flys
                        </ListItem>
                        <ListItem>
                            <ListIcon as={ChevronRightIcon} /> Seated Shoulder Flys
                        </ListItem>
                        <ListItem>
                            <ListIcon as={ChevronRightIcon} /> Tricep Extensions
                        </ListItem>
                        <ListItem>
                            <ListIcon as={ChevronRightIcon} /> Crunches
                        </ListItem>
                        <ListItem>
                            <ListIcon as={ChevronRightIcon} /> Leg Raises
                        </ListItem>
                        <ListItem>
                            <ListIcon as={ChevronRightIcon} /> Stretching
                        </ListItem>
                    </List>
                </Section>
                <Section delay={0.4}>
                <Heading
                        as="h3"
                        variant="section-title"
                        fontSize="20"
                        marginTop="3"
                        marginBottom="4"
                    >
                        Back Day
                    </Heading>
                </Section>
                <Section delay={0.5}>
                    <List>
                        <ListItem>
                            <ListIcon as={ChevronRightIcon} /> Warm-up
                        </ListItem>
                        <ListItem>
                            <ListIcon as={ChevronRightIcon} /> Deadlifts
                        </ListItem>
                        <ListItem>
                            <ListIcon as={ChevronRightIcon} /> Pullup
                        </ListItem>
                        <ListItem>
                            <ListIcon as={ChevronRightIcon} /> Bentover Row
                        </ListItem>
                        <ListItem>
                            <ListIcon as={ChevronRightIcon} /> Standing Row
                        </ListItem>
                        <ListItem>
                            <ListIcon as={ChevronRightIcon} /> RearShoulder Flys
                        </ListItem>
                        <ListItem>
                            <ListIcon as={ChevronRightIcon} /> Bicep Curls
                        </ListItem>
                        <ListItem>
                            <ListIcon as={ChevronRightIcon} /> Bridges
                        </ListItem>
                        <ListItem>
                            <ListIcon as={ChevronRightIcon} /> Planks
                        </ListItem>
                        <ListItem>
                            <ListIcon as={ChevronRightIcon} /> Stretching
                        </ListItem>
                    </List>
                </Section>
                <Section delay={0.6}>
                <Heading
                        as="h3"
                        variant="section-title"
                        fontSize="20"
                        marginTop="3"
                        marginBottom="4"
                    >
                        Leg Day
                    </Heading>
                </Section>
                <Section delay={0.7}>
                    <List>
                        <ListItem>
                            <ListIcon as={ChevronRightIcon} /> Warm-up
                        </ListItem>
                        <ListItem>
                            <ListIcon as={ChevronRightIcon} /> Squats
                        </ListItem>
                        <ListItem>
                            <ListIcon as={ChevronRightIcon} /> Leg Press
                        </ListItem>
                        <ListItem>
                            <ListIcon as={ChevronRightIcon} /> Lunges
                        </ListItem>
                        <ListItem>
                            <ListIcon as={ChevronRightIcon} /> Hamstring Curls
                        </ListItem>
                        <ListItem>
                            <ListIcon as={ChevronRightIcon} /> Quad Extensions
                        </ListItem>
                        <ListItem>
                            <ListIcon as={ChevronRightIcon} /> Calf Raises
                        </ListItem>
                        <ListItem>
                            <ListIcon as={ChevronRightIcon} /> Hip Thrusts
                        </ListItem>
                        <ListItem>
                            <ListIcon as={ChevronRightIcon} /> Stretching
                        </ListItem>
                    </List>
                </Section>
            </Container>
        </Layout>
    )
}

export default routine