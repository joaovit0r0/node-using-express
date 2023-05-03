const { uuid } = require('uuidv4');

const contact = [
  {
    id: uuid(),
    name: 'João Víctor',
    email: 'joao@mail.com',
    phone: '123123123',
    category_id: uuid(),
  },
];

class ContactRepository {
  findAll() {
    // O repository deve apenas conhecer o Data Source. Quem é responsável por tratar erros,
    // é a regra de negócocio, por isso, somente é retornado o resolve
    return new Promise((resolve) => {
      resolve(contact);
    });
  }
}

module.exports = new ContactRepository();
