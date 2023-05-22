const contactsRepository = require('../repositories/contactRepository');

class ContactController {
  async index(request, response) {
    // Listar todos os registros

    const contacts = await contactsRepository.findAll();
    response.json(contacts);
  }

  // Obter um registro
  async show(request, response) {
    const { id } = request.params;
    const contact = await contactsRepository.findById(id);

    if (!contact) return response.status(404).json({ error: 'User not found' });

    response.json(contact);
  }

  // Criar um regisytros
  store() {
  }

  update() {
    // Editar um registro
  }

  // Deletar um registros
  async delete(request, response) {
    const { id } = request.params;

    const contact = contactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'User not found' });
    }

    await contactsRepository.delete(id);
    response.sendStatus(204); // 204 = requisição ok, porém sem retorno
  }
}

// Singleton
// O Node no momento em que vai fazer o export, a primeira coisa que ele faz
// é procurar na memória pra ver se uma instância da classe já eixste, caso não exista
// ele cria e a retorna, posteriormente ele retorna apenas aquela instância criada
module.exports = new ContactController();
