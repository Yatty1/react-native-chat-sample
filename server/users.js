
class Users {
  constructor() {
    this.users = [];
  }

  addUser = (id, name, room) => {
    const user = {id, name, room};
    users.push(user);
    return user;
  }

  getUser = (id) => {
    return users.filter(user => user.id === id)[0];
  }

  removeUser = (id) => {
    const user = getUser(id);
    if (user) {
      this.users = users.filter(user => user !== user);
    }
    return user;
  }
  getUserList(room) {
    const users = this.users.filter(user =>  user.room === room);
    return users.map(user => user.name);
  }
}

module.exports = { Users };