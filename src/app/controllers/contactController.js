const contactRepository = require('../repositories/contactRepository');
const contactsRepository = require('../repositories/contactRepository');

class ContactController {
  // Listar todos os registros
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await contactsRepository.findAll(orderBy);
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
  async store(request, response) {
    const { name, email, phone, categoryId } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'name is required' });
    }

    const contactExists = await contactRepository.findByEmail(email);

    if (contactExists) {
      return response
        .status(400)
        .json({ error: 'This e-mail is already in use' });
    }

    const newContact = await contactRepository.create({
      name,
      email,
      phone,
      categoryId,
    });

    return response.json(newContact);
  }

  async update(request, response) {
    const { id } = request.params;
    console.log(id);

    const { name, email, phone, categoryId } = request.body;
    const contact = await contactsRepository.findById(id);

    if (!contact) return response.status(404).json({ error: 'User not found' });
    if (!name) {
      return response.status(400).json({ error: 'name is required' });
    }

    const contactExists = await contactRepository.findByEmail(email);

    if (contactExists && contactExists.id !== id) {
      return response
        .status(400)
        .json({ error: 'This e-mail is already in use' });
    }

    const updatedContact = await contactRepository.update(id, {
      name,
      email,
      phone,
      categoryId,
    });

    return response.json(updatedContact);
  }

  // Deletar um registros
  async delete(request, response) {
    const { id } = request.params;

    await contactsRepository.delete(id);
    response.sendStatus(204); // 204 = requisição ok, porém sem retorno
  }
}

// Singleton
// O Node no momento em que vai fazer o export, a primeira coisa que ele faz
// é procurar na memória pra ver se uma instância da classe já eixste, caso não exista
// ele cria e a retorna, posteriormente ele retorna apenas aquela instância criada
module.exports = new ContactController();
