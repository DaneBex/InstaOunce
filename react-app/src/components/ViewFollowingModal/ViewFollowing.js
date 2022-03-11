import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const ViewFollowing = ({ user }) => {

    const usersObj = useSelector(state => state.user)
    const users = Object.values(usersObj)
    let theseUsers;

    if (users) {
        theseUsers = users.filter(user => {
        return user.followers.forEach(follower => {
            if (follower.id === user.id) return follower;
           console.log(follower)
        })
    })
}

console.log(users,theseUsers)

    return (
        <div className="followers-list">
            <div className="followers-header">
                <h1>Followers</h1>
            </div>
            <ul className="followers-list-followers-list">
                {user.followers && user.followers.map(follower => (
                    <div className="follower-box">
                        <img className="follower-list-prof-pic" src={follower.profile_pic} />
                        <p>{follower.username}</p>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default ViewFollowing
