const bcrypt = require("bcryptjs");

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Users', [
			{
				name: "Kidman Den",
				email: 'kidman@binar.co.id',
				encryptedPassword: bcrypt.hashSync('123456', 10),
				roleId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Mionel Lessi",
				email: 'lessi@binar.co.id',
				roleId: null,
				encryptedPassword: bcrypt.hashSync('123456', 10),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Hermano",
				email: 'hermano@binar.co.id',
				roleId: 1,
				encryptedPassword: bcrypt.hashSync('123456', 10),
				createdAt: new Date(),
				updatedAt: new Date(),
			}
		]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users');
	}
};