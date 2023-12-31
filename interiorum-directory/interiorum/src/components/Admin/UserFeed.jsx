import { Box, Divider, HStack, Text } from '@chakra-ui/react';
import SingleUser from './SingleUser';
import { WANT_ADMIN_ROLE } from '../../common/constants';

import PropTypes from 'prop-types';

const UserFeed = ({ users, roleType=null, searchTerm }) => {
    return (
        <Box bg='brand.600' w='100%' rounded='md'>
            {users.length ?
                users.map(u => {
                    return (
                        <Box key={u.uid}>
                            <SingleUser user={u} roleType={roleType} />
                            <HStack px={6}>
                                <Divider />
                            </HStack>
                        </Box>);
                }) :
                roleType ?
                    <Text align='center' py={2}>There are currently no {roleType === WANT_ADMIN_ROLE ? 'admin applicant' : 'blocked'} users.</Text> :
                    <Text align='center' py={2}>There are no users found for &quot;{searchTerm}&quot;.</Text>}
        </Box>
    );
};

UserFeed.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            uid: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    roleType: PropTypes.oneOf([null, 'base', 'wantAdmin', 'admin', 'blocked']),
    searchTerm: PropTypes.string,
};

export default UserFeed;
