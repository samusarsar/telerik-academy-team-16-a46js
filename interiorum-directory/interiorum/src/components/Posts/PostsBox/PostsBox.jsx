import { Container, Heading, Button, Icon, Spinner, Box, Center } from '@chakra-ui/react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import PostFeed from '../../Posts/PostFeed/PostFeed.jsx';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';

const PostsBox = ({ heading, posts, isLoading }) => {
    const navigate = useNavigate();

    return (
        <Container display={'flex'} flexDirection={'column'} align={'center'} bg={'white'} borderRadius={'10px'} p={'20px'} m={'20px'} boxShadow={'2xl'}>
            <Heading size='md'>{heading}</Heading>

            {isLoading ? (
                <Box alignContent='center' marginY='20px'>
                    <Spinner size='xl' />
                </Box>

            ) : (
                <PostFeed posts={posts}></PostFeed>
            )
            }

            <Button rightIcon={<Icon as={AiOutlineArrowRight} />} colorScheme='telegram' variant='outline' onClick={() => navigate('../forum')}>
                View all
            </Button>
        </Container >
    );
};

PostsBox.propTypes = {
    heading: PropTypes.string.isRequired,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    isLoading: PropTypes.bool,
};

export default PostsBox;
