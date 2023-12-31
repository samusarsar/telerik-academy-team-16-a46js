import { FormControl, FormLabel, Input, FormErrorMessage, Text, Button, HStack, Divider, VStack, useToast, FormHelperText } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { AppContext } from '../../../context/AppContext/AppContext';
import { useNavigate } from 'react-router-dom';
import AccountBase from '../../Account/AccountBase';
import { createUser, getUserByHandle } from '../../../services/users.service';
import { registerUser } from '../../../services/auth.service';
import { PASSWORD_MIN_LENGTH, RESTRICTED_CHARS, USER_NAME_MAX_LENGTH, USER_NAME_MIN_LENGTH } from '../../../common/constants';

const SignUp = () => {
    const { setContext } = useContext(AppContext);

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastName, setLastName] = useState('');
    const [lastNameError, setLastNameError] = useState(false);
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [rePassword, setRePassword] = useState('');
    const [rePasswordError, setRePasswordError] = useState(false);

    const toast = useToast();

    const onSignUp = () => {
        setUsernameError(RESTRICTED_CHARS.some(c => username.includes(c)) &&
            'Username can\'t contain special chararacters.');
        setPasswordError(password.length < PASSWORD_MIN_LENGTH);
        setRePasswordError(rePassword !== password);
        setFirstNameError(firstName.length < USER_NAME_MIN_LENGTH || firstName.length > USER_NAME_MAX_LENGTH);
        setLastNameError(lastName.length < USER_NAME_MIN_LENGTH || lastName.length > USER_NAME_MAX_LENGTH);
        setEmailError(!email.includes('@') && 'Email is not valid.');
        if (!RESTRICTED_CHARS.some(c => username.includes(c)) &&
            (password.length >= PASSWORD_MIN_LENGTH) &&
            (rePassword === password) &&
            (firstName.length > USER_NAME_MIN_LENGTH || firstName.length < USER_NAME_MAX_LENGTH) &&
            (lastName.length > USER_NAME_MIN_LENGTH || lastName.length < USER_NAME_MAX_LENGTH) &&
            (email.includes('@'))) {
            getUserByHandle(username)
                .catch(() => {
                    return registerUser(email, password)
                        .then(credential => {
                            return createUser(username, credential.user.uid, credential.user.email, firstName, lastName)
                                .then(() =>
                                    setContext({
                                        user: credential.user,
                                    }));
                        })
                        .then(() => {
                            navigate('/home');
                            toast({
                                title: 'Welcome to your Interiorum!',
                                description: 'You have successfully signed up. Have fun!',
                                status: 'success',
                                duration: 3000,
                                isClosable: true,
                                position: 'top',
                                variant: 'subtle',
                            });
                        });
                })
                .then(result => {
                    if (result) {
                        throw new Error(`Username ${username} has already been taken!`);
                    }
                })
                .catch(e => {
                    switch (e.message) {
                    case 'Firebase: Error (auth/email-already-in-use).':
                        setEmailError('Email is already in use.');
                        break;
                    case `Username ${username} has already been taken!`:
                        setUsernameError(`Username ${username} has already been taken!`);
                        break;
                    };
                });
        }
    };

    return (
        <AccountBase>
            <HStack h='350px' p={10}>
                <VStack>
                    <FormControl isInvalid={usernameError} isRequired='true' pr={4}>
                        <FormLabel>Username</FormLabel>
                        <Input type='text' placeholder='johnjordan123' onChange={(e) => setUsername(e.target.value)} bg='brand.600' color='brand.500' />
                        <FormHelperText maxW='200px'>Username can&apos;t contain special characters.</FormHelperText>
                        <FormErrorMessage>{usernameError}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={passwordError} isRequired='true' pr={4}>
                        <FormLabel>Password</FormLabel>
                        <Input type='password' onChange={(e) => setPassword(e.target.value)} bg='brand.600' color='brand.500' />
                        <FormErrorMessage>Password should be more than 6 characters.</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={rePasswordError} isRequired='true' pr={4}>
                        <FormLabel>Confirm</FormLabel>
                        <Input type='password' onChange={(e) => setRePassword(e.target.value)} bg='brand.600' color='brand.500' />
                        <FormErrorMessage>Password confirmation did not match.</FormErrorMessage>
                    </FormControl>
                </VStack>
                <Divider orientation='vertical' />
                <VStack pl={4}>
                    <FormControl isInvalid={firstNameError} isRequired='true'>
                        <FormLabel>First Name</FormLabel>
                        <Input type='text' placeholder='John' onChange={(e) => setFirstName(e.target.value)} bg='brand.600' color='brand.500' />
                        <FormErrorMessage>First name should be between 4 and 32 characters.</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={lastNameError} isRequired='true'>
                        <FormLabel>Last Name</FormLabel>
                        <Input type='text' placeholder='Jordan' onChange={(e) => setLastName(e.target.value)} bg='brand.600' color='brand.500' />
                        <FormErrorMessage>Last name should be between 4 and 32 characters.</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={emailError} isRequired='true' >
                        <FormLabel>Email</FormLabel>
                        <Input type='email' placeholder='johnjordan@interiorum.bg' onChange={(e) => setEmail(e.target.value)} bg='brand.600' color='brand.500'/>
                        <FormErrorMessage>{emailError}</FormErrorMessage>
                    </FormControl>
                </VStack>
            </HStack>
            <VStack mb={8}>
                <HStack>
                    <Button colorScheme='orange' onClick={onSignUp}>Sign Up</Button>
                    <Button colorScheme='whiteAlpha' onClick={() => navigate('/')}>Cancel</Button>
                </HStack>
                <Text fontSize='sm'>Already have an account?
                    <Button colorScheme='telegram' variant='link' ml={2} onClick={() => navigate('../log-in')}>Log In</Button>
                </Text>
            </VStack>
        </AccountBase>
    );
};

export default SignUp;
