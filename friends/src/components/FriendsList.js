import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';


const FriendsList = () => {
    const [ friends, setFriends ] = useState([]);
    const [ newFriend, setNewFriend ] = useState({
        id: Date.now(),
        name: "",
        age: "",
        email: ""
    });

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

    const addFriend = e => {
        e.preventDefault();
        axiosWithAuth()
          .post("/friends", newFriend)
          .then(res => {
            // console.log(res);
            setFriends(res.data);
          })
          .catch(err => {
            console.log("invalid friend: ", err);
          });
      };

    const handleChange = e => {
        setNewFriend({
            ...newFriend,
            [e.target.name]: e.target.value,
        })
    }



    return (
        <div>
            {friends.map(friend => {
                return <div key={friend.id}>{friend.name}</div>
            })}
            <form onSubmit={addFriend} >
                <input
                type="text"
                name="name"
                value={newFriend.name}
                onChange={handleChange}
                />
                <input
                type="text"
                name="age"
                value={newFriend.age}
                onChange={handleChange}
                />
                <input
                type="text"
                name="email"
                value={newFriend.email}
                onChange={handleChange}
                />
                <button>Add Friend</button>
            </form>
        </div>
    )
}

export default FriendsList