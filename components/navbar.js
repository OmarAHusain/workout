import Logo from './logo'
import NextLink from 'next/link'
import {
    Container,
    Box,
    Link,
    Stack,
    Heading,
    Flex,
    Menu,
    MenuItem,
    MenuList,
    MenuButton,
    IconButton,
    useColorModeValue
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import ThemeToggleButton from './theme-toggle-button'

const LinkItem = ({ href, path, children }) => {
    const active = path === href
    const inactiveColor = useColorModeValue('#202023', 'whiteAlpha.900')
    const activeColor = useColorModeValue('whiteAlpha.900','#202023')
    const activeBg = useColorModeValue('#202023','whiteAlpha.900')
    
    return (
        <NextLink href ={href}>
            <Link>
                <Box
                    p={2}
                    borderRadius="lg"
                    bg={active ? activeBg : undefined} 
                    color={ active ? activeColor : inactiveColor}
                >
                    {children}
                </Box>
            </Link>
        </NextLink>
    )
}

const Navbar = props => {
    const { path } = props
    return (
        <Box
        position="fixed"
        as="nav"
        w="100%"
        bg={useColorModeValue('#ffffff40', '#20202380')}
        style={{backdropFilter:'blur(40px'}}
        zIndex={1}
        {...props}
        >
            <Container 
                display="flex" 
                p={2} 
                maxW="container.xl" 
                wrap="wrap" 
                align="center" 
                justify="space-between"
            >
                <Flex align="center" mr={5}>
                    <Heading as="h1" size="lg" letterSpacing={'tighter'}> 
                        <Logo />
                    </Heading>
                </Flex>
                <Stack
                    direction={{ base: 'column', md: 'row' }}
                    display={{ base:'none', md: 'flex' }}
                    width={{ base: 'full', md: 'auto' }}
                    alignItems="center"
                    flexfrow={1}
                    mt={{ base: 4, nmd: 0 }}
                >
                    <LinkItem href="/" path={path}>
                        Entry
                    </LinkItem>
                    <LinkItem href="/generator" path={path}>
                        Data
                    </LinkItem>
                    <LinkItem href="/upload" path={path}>
                        Config
                    </LinkItem>
                </Stack>
                <Box flex={1} align="right">
                    <ThemeToggleButton />
                    <Box ml={2} display={{base:'inline-block', md:'none'}}>
                        <Menu>
                            <MenuButton 
                                as={IconButton} 
                                icon={<HamburgerIcon />} 
                                vairant="outline" 
                                aria-label="Options" 
                            />
                            <MenuList>
                                <NextLink href="/" passHref>
                                    <MenuItem as={Link}>Entry</MenuItem>
                                </NextLink>
                                <NextLink href="/data" passHref>
                                    <MenuItem as={Link}>Data</MenuItem>
                                </NextLink>
                                <NextLink href="/config" passHref>
                                    <MenuItem as={Link}>Config</MenuItem>
                                </NextLink>
                            </MenuList>
                        </Menu>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Navbar