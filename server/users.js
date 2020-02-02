const users = [];

// User.ID is based of the individual socket ID on connection

// Add user to the array.
const addUser = ({ id, name, room}) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name === name);

    if(existingUser) {
        return { error: 'Username already exists.'};
    };


    const user = { id, name, room};
    users.push(user);
    return { user };
}

// Remove user from the array.
const removeUser = ({ id }) => {
    const index = users.findIndex((user) => user.id === id)

    if(index !== -1) {
        return users.splice(index, 1)[0]
    }

};

// Get user information.
const getUser = (id) => users.find((user) => user.id === id);

// Get all users in a room.
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom};