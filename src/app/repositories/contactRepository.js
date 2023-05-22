const { v4 } = require('uuid');

let contacts = [
  {
    id: 1,
    name: 'João Víctor',
    email: 'joao@mail.com',
    phone: '123123123',
    category_id: v4(),
  },
  {
    id: 2,
    name: 'Beltrano Silva',
    email: 'beltrano@mail.com',
    phone: '123123123',
    category_id: v4(),
  },
];

class ContactsRepository {
  findAll() {
    // O repository deve apenas conhecer o Data Source. Quem é responsável por tratar erros,
    // é a regra de negócocio, por isso, somente é retornado o resolve
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }

  findById(id) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.id === Number(id)));
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== Number(id));
      resolve();
    });
  }
}

module.exports = new ContactsRepository();
