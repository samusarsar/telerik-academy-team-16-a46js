import { Spacer, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import FeaturedComment from '../../Comments/FeaturedComment/FeaturedComment';
import CommentFeed from '../../Comments/CommentFeed/CommentFeed';
import CreateComment from '../../Comments/CreateComment/CreateComment';
import { getCommentsByPost, getFeaturedComment } from '../../../services/comment.services';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../config/firebase-config';

const PostCommentsBox = ({ postId }) => {
    const [featured, setFeatured] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        onValue(ref(db, `comments`), () => {
            getCommentsByPost(postId)
                .then(snapshot => {
                    setComments(snapshot);
                    setFeatured(getFeaturedComment(snapshot));
                });
        });
    }, []);

    return (
        <VStack w={{ sm: '100%', md: '80%' }} align='start' boxShadow='lg'>
            <VStack align='center' p={8} bg='brand.100' w='100%' rounded='md'>
                {comments.length === 0 ? (
                    <Text>No comments, yet! Be the first one to comment.</Text>
                ) : (
                    <>
                        <FeaturedComment comment={featured} />
                        <Spacer />
                        <CommentFeed comments={comments} />
                        <Spacer />
                    </>
                )}

                <CreateComment postId={postId} />
            </VStack>
        </VStack>
    );
};

export default PostCommentsBox;
