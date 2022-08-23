const { User } = require("../models/user");
const { Seeder } = require("mongoose-data-seed");

const data = [
  {
    fullName: "admin01",
    email: "admin1@gmail.com",
    password: "admin123",
    role: "admin",
  },
];

class UsersSeeder extends Seeder {
  async shouldRun() {
    const usersCount = await User.count().exec();
    return usersCount === 0;
  }

  async run() {
    return User.create(data);
  }
}

module.exports = {};
