const contactsRepository = require('../repositories/contactRepository');

class ContactController {
  async index(request, response) {
    // Listar todos os registros

    const contacts = await contactsRepository.findAll();
    response.json(contacts);
  }

  show() {
    // Obter um registro

  }

  store() {
    // Criar um regisytros
  }

  update() {
    // Editar um registro
  }

  delete() {
    // Deletar um registros
  }
}

// Singleton
// O Node no momento em que vai fazer o export, a primeira coisa que ele faz
// é procurar na memória pra ver se uma instância da classe já eixste, caso não exista
// ele cria e a retorna, posteriormente ele retorna apenas aquela instância criada
module.exports = new ContactController();
