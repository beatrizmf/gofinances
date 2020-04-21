import { EntityRepository, Repository } from 'typeorm';

import Category from '../models/Category';

@EntityRepository(Category)
class CategoriesRepository extends Repository<Category> {
  public async findOrCreateByName(title: string): Promise<Category> {
    const findCategory = await this.findOne({
      where: { title },
    });

    if (findCategory) {
      return findCategory;
    }

    const createdCategory = this.create({ title });

    await this.save(createdCategory);

    return createdCategory;
  }
}

export default CategoriesRepository;
