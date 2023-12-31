import { equalTo, get, orderByChild, push, query, ref, remove, set, update } from 'firebase/database';
import { deleteObject, getDownloadURL, ref as sRef, uploadBytes } from 'firebase/storage';
import { db, storage } from '../config/firebase-config';
import { deleteComment } from './comment.services';
import Moment from 'moment';

export const addPost = (title, content, categories, handle, imagesURL) => {
    const updates = imagesURL ?
        { title, content, categories, author: handle, createdOn: new Date().toLocaleString(), postId: 'id', imagesURL } :
        { title, content, categories, author: handle, createdOn: new Date().toLocaleString(), postId: 'id' };

    return push(
        ref(db, 'posts'), updates,
    ).then(result => {
        const postId = result.key;
        update(ref(db, `posts/${postId}`), { 'postId': postId });
        addPostToUser(handle, postId);
        return postId;
    });
};

const addPostToUser = (handle, postId) => {
    return get(ref(db, `users/${handle}/posts`))
        .then(snapshot => {
            if (snapshot.exists()) {
                return update(ref(db, `users/${handle}/posts`), {
                    [postId]: true,
                });
            } else {
                return set(ref(db, `users/${handle}/posts`), {
                    [postId]: true,
                });
            }
        });
};

export const deletePost = (postId, handle) => {
    return get(ref(db, `posts/${postId}/comments`))
        .then(snapshot => {
            if (snapshot.exists()) {
                return Object.keys(snapshot.val()).forEach(commentId => deleteComment(handle, commentId));
            }
            return null;
        })
        .then(() => remove(ref(db, `posts/${postId}`))
            .then(() => deletePostToUser(postId, handle)),
        );
};

const deletePostToUser = (postId, handle) => {
    return remove(ref(db, `users/${handle}/posts/${postId}`));
};

export const deleteLikedPostToUser = (handle, postId) => {
    return remove(ref(db, `users/${handle}/likedPosts/${postId}`));
};

export const getPosts = () => {
    return get(query(ref(db, 'posts')))
        .then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('No posts match the search criteria');
            }
            return snapshot.val();
        })
        .then(posts => {
            return Object.values(posts);
        });
};

export const getPostsByAuthor = (handle) => {
    return get(query(ref(db, 'posts'), orderByChild('author'), equalTo(handle)));
};

export const getPostsByCategory = (category = 'allCategories') => {
    return getPosts()
        .then(posts => {
            if (category === 'allCategories') return posts;
            return posts.filter(post => post.categories.includes(category));
        });
};

export const sortPostsByDate = (posts) => {
    return [...posts].sort((a, b) => {
        return new Moment(b.createdOn, 'DD/MM/YYYY, HH:mm:ss') - new Moment(a.createdOn, 'DD/MM/YYYY, HH:mm:ss');
    });
};

export const sortPostsByPopularity = (posts) => {

    const commentedPosts = posts
        .filter(post => post.comments)
        .sort((a, b) => Object.keys(b.comments).length - Object.keys(a.comments).length);

    const notCommentedPosts = posts
        .filter(post => !post.comments);
    return commentedPosts.concat(sortPostsByDate(notCommentedPosts));
};

export const filterUnansweredPosts = (posts) => {
    const unansweredPosts = posts.filter(post => !post.comments);
    return sortPostsByDate(unansweredPosts);
};

export const getPostById = (postId) => {
    return get(ref(db, `posts/${postId}`))
        .then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('No posts match the search criteria');
            }
            return snapshot.val();
        });
};

export const addLikeToPost = ({ postId, handle }) => {
    get(ref(db, `posts/${postId}/likes`))
        .then(snapshot => {
            if (snapshot.exists()) {
                update(ref(db, `posts/${postId}/likes`), {
                    [handle]: true,
                });
            } else {
                set(ref(db, `posts/${postId}/likes`), {
                    [handle]: true,
                });
            }
        });
};

export const removeLikeToPost = ({ postId, handle }) => {
    get(ref(db, `posts/${postId}/likes`))
        .then(() => {
            update(ref(db, `posts/${postId}/likes`), {
                [handle]: null,
            });
        });
};

export const editPost = ({ postId, title, content, imagesURL }) => {
    return imagesURL ?
        update(ref(db, `posts/${postId}`), {
            title,
            content,
            imagesURL,
            lastEdited: new Date().toLocaleString(),
        }) :
        update(ref(db, `posts/${postId}`), {
            title,
            content,
            lastEdited: new Date().toLocaleString(),
        });
};

export const uploadImagesForPost = ({ images }) => {
    return Promise.all(
        images.map(img => uploadBytes(sRef(storage, `posts/images/${img.name}`), img)))
        .then((resArr) => Promise.all(
            resArr.map(img => getDownloadURL(sRef(storage, `posts/images/${img.metadata.name}`)))));
};

export const deleteImagesForPost = ({ postId, imageNames }) => {
    return Promise.all(
        imageNames.map(name => deleteObject(sRef(storage, `posts/images/${name}`))),
    )
        .then(() => set(ref(db, `posts/${postId}/imagesURL`), null));
};
