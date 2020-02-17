import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';


const FriendsList = () => {
    const [ friends, setFriends ] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axiosWithAuth()
        .get("/friends")
        .then(res => {
            console.log(res);
            setFriends(res.data)
        })
        .catch(err => console.error(err));
    };

    return (
        <div>
            {friends.map(friend => {
                return <div>{friend.name}</div>
            })}
        </div>
    )
}

export default FriendsList