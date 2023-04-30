import { Container, FormControl, FormLabel, Input, FormHelperText, FormErrorMessage, Box, Heading, Text, Button, HStack, Divider, ButtonGroup, VStack, Spacer } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../AuthContext/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const user = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from || '/';

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFirstNameChange = (e) => setFirstName(e.target.value);
    const handleLastNameChange = (e) => setLastName(e.target.value);
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const isError = !email.includes('@');

    return (
        <Container
            className='main-view'
            id='log-in-view'
            maxW='container'
            minH='90vh'
            sx={{
                'background': 'linear-gradient(90deg, rgba(68,74,83,0.8) 0%, rgba(68,74,83,0.3) 50%, rgba(68,74,83,0.8) 100%), url(\'src/assets/images/login-couch.jpeg\')',
                'background-size': 'cover',
                'background-position': 'center',
            }}
            centerContent>
            <Box bg='brand.400' border='2px solid' borderColor='brand.500' rounded='md' boxShadow='2xl' color='brand.600' my={10} align='center'>
                <Box align='center' p={10} bg='brand.500'>
                    <Heading as='h1' size='lg'>Welcome to INTERIORUM</Heading>
                    <Text as='cite'>...where home becomes art...</Text>
                </Box>
                <HStack h='350px' p={10}>
                    <FormControl isRequired='true' pr={4}>
                        <FormLabel>Username</FormLabel>
                        <Input type='text' value={username} onChange={handleUsernameChange} bg='brand.600' color='brand.500' />
                        <FormLabel>Password</FormLabel>
                        <Input type='text' value={password.split('').map(() => '•').join('')} onChange={handlePasswordChange} bg='brand.600' color='brand.500' />
                    </FormControl>
                    <Divider orientation='vertical' />
                    <FormControl isRequired='true' pl={4}>
                        <FormLabel>First Name</FormLabel>
                        <Input type='text' value={firstName} onChange={handleFirstNameChange} bg='brand.600' color='brand.500' />
                        <FormLabel>Last Name</FormLabel>
                        <Input type='text' value={lastName} onChange={handleLastNameChange} bg='brand.600' color='brand.500' />
                        <FormControl isInvalid={isError} isRequired='true' >
                            <FormLabel>Email</FormLabel>
                            <Input type='email' value={email} onChange={handleEmailChange} bg='brand.600' color='brand.500'/>
                            {!isError ? (
                                <FormHelperText>
                                        Enter the email you'd like to receive the newsletter on.
                                </FormHelperText>
                            ) : (
                                <FormErrorMessage>Email is required.</FormErrorMessage>
                            )}
                        </FormControl>
                    </FormControl>
                </HStack>
                <VStack mb={8}>
                    <Button colorScheme='orange' onClick={() => {
                        user.setLoginState(true);
                        navigate(from, { replace: true });
                    }}>Sign Up</Button>
                    <Text fontSize='sm' as='caption'>Already have an account?
                        <Button colorScheme='telegram' variant='link' ml={2} onClick={() => navigate('../log-in')}>Log In</Button>
                    </Text>
                </VStack>
            </Box>
        </Container>
    );
};

export default SignUp;
