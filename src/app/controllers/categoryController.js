const categoryRepository = require('../repositories/categoryRepository');

class CategoryController {
  // Listar todos os registros
  async index(request, response) {
    const { orderBy } = request.query;
    const category = await categoryRepository.findAll(orderBy);
    response.json(category);
  }

  // Obter um registro
  async show(request, response) {
    const { id } = request.params;
    const category = await categoryRepository.findById(id);

    if (!category) return response.status(404).json({ error: 'Category not found' });

    response.json(category);
  }

  // Criar um regisytros
  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'name is required' });
    }

    const categorytExists = await categoryRepository.findByName(name);

    if (categorytExists) {
      return response
        .status(400)
        .json({ error: 'This name is already in use' });
    }

    const category = await categoryRepository.create({ name });

    return response.json(category);
  }

  async update(request, response) {
    const { id } = request.params;

    const { name } = request.body;
    const category = await categoryRepository.findById(id);

    if (!category) {
      return response.status(404).json({ error: 'Category not found' });
    }
    if (!name) {
      return response.status(400).json({ error: 'name is required' });
    }

    const categorytExists = await CategoryController.findByName(name);

    if (categorytExists && categorytExists.id !== id) {
      return response
        .status(400)
        .json({ error: 'This e-mail is already in use' });
    }

    const updatedContact = await CategoryController.update(id, {
      name,
    });

    return response.json(updatedContact);
  }

  // Deletar um registros
  async delete(request, response) {
    const { id } = request.params;

    await categoryRepository.delete(id);
    response.sendStatus(204); // 204 = requisição ok, porém sem retorno
  }
}

// Singleton
// O Node no momento em que vai fazer o export, a primeira coisa que ele faz
// é procurar na memória pra ver se uma instância da classe já eixste, caso não exista
// ele cria e a retorna, posteriormente ele retorna apenas aquela instância criada
module.exports = new CategoryController();
