import { Heading, VStack, HStack, Text, Avatar } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getTopUsers } from '../../../services/users.service';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

const TopUsersList = ({ type }) => {
    const [topUsers, setTopUsers] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getTopUsers(type)
            .then(users => setTopUsers(users))
            .catch(() => navigate('../../server-down'));
    }, []);

    return (
        <VStack bg={'white'} borderRadius={'10px'} p={'20px'} m={'20px'} boxShadow={'md'}>
            <Heading as='h5' size='sm'>Top {type === 'posts' ? 'Posters' : 'Commenters'}</Heading>
            <VStack align='start' py={3}>
                {topUsers &&
                    (topUsers.map(user => {
                        return (
                            <Link key={user.uid} to={`../../profile/${user.handle}`} >
                                <HStack justify='left' py={0.5}>
                                    <Avatar size='md' name={`${user.firstName} ${user.lastName}`} src={user.avatarURL} />
                                    <Text key={user.uid} fontSize='0.9em'>{user.firstName} {user.lastName}</Text>
                                </HStack>
                            </Link>
                        );
                    }))}
            </VStack>
        </VStack>
    );
};

TopUsersList.propTypes = {
    type: PropTypes.string.isRequired,
};

export default TopUsersList;
