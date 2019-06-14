const uuidv4 = require('uuid/v4');

const createUser = ({name = '', socketId = null} = {}) => (
    {
        id: uuidv4(),
        name,
        socketId
    }
);

const createMessage = ({message = '', sender = ''} = {}) => {
    return {
        id: uuidv4(),
        time: getTime(new Date(Date.now())),
        message,
        sender
    }
};

const createChat = ({messages = [], name = 'Community', isCommunity = false, users = [] } = {}) => {
    return {
        id: uuidv4(),
        name: isCommunity ? 'Community' : createNameFromUsers(users),
        messages,
        users,
        typingUsers: [],
        isCommunity
    }
};

const createNameFromUsers = (users, excludedUser = '') => {
    return users.filter(u => u !== excludedUser).join(' & ') || 'Empty Users'
};

const getTime = (date) => {
    return `${date.getHours()}:${('0'+ date.getMinutes()).slice(-2)}`
};

module.exports = {createChat, createMessage, createUser, createNameFromUsers};