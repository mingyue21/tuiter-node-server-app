import people from './users.js';
let users = people;

const UserController = (app) => {
    app.get('/api/users', findUsers);
    app.get('/api/users/:uid', findUserById);
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
}

const createUser = (req, res) => {
    const newUser = req.body;
    newUser.id = (new Date()).getTime();
    users.push(newUser);
    res.json(newUser);
}

const findUsers = (req, res) => {
    const type = req.query.type;
    if (type) {
        const userOfType = users.filter(u => u.type === type);
        res.json(userOfType);
        return;
    }
    res.json(users);
}

const findUserById = (req, res) => {
    const userId = req.params.uid;
    const user = users.find(u => u._id === userId);
    res.json(user);
}

const deleteUser = (req, res) => {
    const userId = req.params.uid;
    users = users.filter(u => u._id !== userId);
    res.sendStatus(200);
}

const updateUser = (req, res) => {
    const userId = req.params.uid;
    const updates = req.body;
    users = users.map((u) =>  u._id === userId ? {...u, ...updates} : u);
    res.sendStatus(200);
}

export default UserController;