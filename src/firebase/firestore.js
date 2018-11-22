import {db} from './firebase';
import {firestore} from 'firebase';

export async function addPost(post) {
    const postRef = db
        .collection('posts')
        .add(post)
    return postRef
}
export async function addLikesForPic(like) {
     db
        .collection('likesForPic')
        .add(like);

}
export async function updateLikesForPic(like, user) {
    const likeRef = await db
        .collection("likesForPic")
        .where("imgURL", "==", like.imgURL)
        .get();
    likeRef.forEach(async doc => {
        console.log(doc);
        const updateRef = await doc
            .ref
            .update({
                "users": firestore
                    .FieldValue
                    .arrayUnion(user),
                "likeCount": like.likeCount + 1
            })
        console.log(updateRef);
    });
}
export async function getLikesForImage(post) {
    const likeRef = await db
        .collection('likesForPic')
        .where('imgURL', '==', post.imgURL);
    console.log(likeRef);
    return likeRef;
}
export async function getPostForImgURL(imgUrl) {
    const imgRef = await db
        .collection('posts')
        .where('imgURL', '==', imgUrl);
    console.log(imgRef);
    return imgRef;
}
export async function deleteLikesForPic(imgUrl) {
    const likeRef = await db
        .collection('likesForPic')
        .where('imgURL', '==', imgUrl);
    return likeRef;
}