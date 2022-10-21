import Link from 'next/link'
import Image from 'next/image'
import { Text, useColorModeValue } from '@chakra-ui/react'
import styled from '@emotion/styled'

const LogoBox = styled.span`
    display: inline-flex;
    align-items: center;
    height: 30px;
    line-height: 20px;
    padding: 10px;

    img {
        transition: 300ms ease;
      }

    &:hover img {
        transform: rotate(20deg);
    }`

const TextBox = styled.span`
    display: block;
    align-items: center;
    height: 30px;
`

const LogoTitle = styled.span`
    font-weight: bold;
    font-size: 18px;
`

const LogosubTitle = styled.span`
    font-weight: italic;
    font-size: 12px;
`

const Logo = () => {
    const footPrintImg = `/images/logo2${useColorModeValue('', '-dark')}.png`
    return (
        <Link href="https://www.omar.cloud" target="_blank">
            <a>
                <LogoBox>
                    <Image src={footPrintImg} width={20} height={20} alt="Logo" />
                    <TextBox>
                        <LogoTitle>
                            <Text color={useColorModeValue('gray.800', 'whiteAlpha.900')} fontFamily='M PLUS Rounded 1c' fontWeight="bold" ml={3}>
                                Workout Tracker
                            </Text>
                        </LogoTitle>
                        <LogosubTitle>
                            <Text color={useColorModeValue('gray.800','whiteAlpha.900')} fontFamily='M Rounded 1c' fontWeight="italic">
                                by Omar Adam Husain
                            </Text>
                        </LogosubTitle>
                    </TextBox>
                </LogoBox>
            </a>
        </Link>
    )
}

export default Logo