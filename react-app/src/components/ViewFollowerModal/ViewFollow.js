import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const ViewFollower = ({ user }) => {

    console.log(user.followers)

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

export default ViewFollower
