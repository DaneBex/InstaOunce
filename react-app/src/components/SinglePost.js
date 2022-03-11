import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
// import { getSinglePost } from "../store/post";

const SinglePost = () => {
    return (
        <h1>Posts go here!</h1>
     );
}

export default SinglePost;
// const SinglePost = ({posts}) => {
//     const history = useHistory();
//     const dispatch = useDispatch();
//     const { id } = useParams();
//     const userId = useSelector((state) => state.session.user?.id);
//     const singlePost = useSelector(state => state.post[id]);
//     console.log(`parameter id: ${id}, user id: ${userId}, post: ${singlePost}`)

//     useEffect(() => {
//         dispatch(getSinglePost(id))
//     }, [dispatch]);

//     return (
//         <>
//         <div className="">
//           <img src={singlePost?.imageUrl} alt='nothing yet' />
//         </div>

//         <div className="user-profile-post-container">
//         <p id="user-profile-post-header">
//           <FontAwesomeIcon id="user-profile-post-icon" icon={faClipboard} />{" "}
//           Posts
//         </p>
//         <div className="user-profile-posts-container">
//           {userPosts?.map((post) => (
//             <div key={post.id} className="user-profile-post-card">
//               <div className="user-profile-post-info">
//                 <p>
//                   <FontAwesomeIcon
//                     className="user-profile-post-info-content"
//                     icon={faHeart}
//                   />{" "}
//                   {post.likes}
//                 </p>
//                 <p>
//                   <FontAwesomeIcon
//                     className="user-profile-post-info-content"
//                     icon={faComment}
//                   />{" "}
//                   {post.comments?.length}
//                 </p>
//               </div>
//               <img className="user-profile-post-img" src={post.imageUrl} />
//             </div>
//           ))}
//         </div>
//         </div>
//       </>
//     );
// }

// export default SinglePost;
