import { equalTo, get, orderByChild, orderByKey, push, query, ref, update } from 'firebase/database';
import { db } from '../config/firebase-config';

export const addPost = (title, content, categories, handle) => {

    return push(
        ref(db, 'posts'), { title, content, categories, author: handle, createdOn: new Date().toLocaleDateString(), comments: {}, likes: {}, postId: 'id' },
    ).then(result => {
        const postId = result.key;
        console.log(postId);
        update(ref(db, `posts/${postId}`), { 'postId': postId });

    });
};

export const getPosts = () => {
    return get(query(ref(db, 'posts')))
        .then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('No posts match the search criteria'); // TODO
            }
            return snapshot.val();
        })
        .then(posts => {
            return Object.keys(posts).map(postId => {
                return {
                    ...posts[postId],
                };
            });
        });
};

export const getPostsByAuthor = (handle) => {
    return get(query(ref(db, 'posts'), orderByChild('author'), equalTo(handle)));
};

export const getPostsByCategory = (category = 'allCategories') => {
    return getPosts()
        .then(posts => {
            if (category === 'allCategories') return posts;
            console.log(posts.filter(post => post.categories.includes(category)));
            return posts.filter(post => post.categories.includes(category));
        });
};

export const sortPostsByDate = (posts) => {
    return [...posts].sort((a, b) => {
        return new Date(b.createdOn)- new Date(a.createdOn);
    });
};

export const sortPostsByPopularity = (posts) => {
    return [];
    return [...posts].sort((a, b) => b.comments.length - a.comments.length);
};

export const filterUnansweredPosts = (posts) => {
    return [];
    // return posts.filter(post => post.comments.length === 0);
};

export const getPostById = (postId) => {
    console.log(postId);
    return get(ref(db, `posts/${postId}`))
        .then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('No posts match the search criteria'); // TODO
            }
            console.log(snapshot.val());
            return snapshot.val();
        });
};

// query(ref(db, 'posts'), orderByChild('author'), equalTo('pesho'))