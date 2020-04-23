import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import CategoriesRepository from '../repositories/CategoriesRepository';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category_title: string;
}

class CreateTransactionService {
  public async execute({
    title,
    type,
    value,
    category_title,
  }: Request): Promise<Transaction> {
    if (type !== 'income' && type !== 'outcome') {
      throw new AppError('type must be income or outcome');
    }

    if (value <= 0) {
      throw new AppError('value must be greater than 0');
    }

    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const { total } = await transactionsRepository.getBalance();

    if (type === 'outcome' && value > total) {
      throw new AppError('insufficient balance');
    }

    const categoriesRepository = getCustomRepository(CategoriesRepository);

    const category = await categoriesRepository.findOrCreateByName(
      category_title,
    );

    const transaction = transactionsRepository.create({
      title,
      type,
      value,
      category_id: category.id,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
