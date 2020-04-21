import { Router } from 'express';

import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (req, res) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository);

  const balance = await transactionsRepository.getBalance();
  const transactions = await transactionsRepository.find({
    select: ['id', 'title', 'value', 'type', 'category'],
    relations: ['category'],
  });

  return res.json({ transactions, balance });
});

transactionsRouter.post('/', async (req, res) => {
  const { title, type, value, category } = req.body;

  const createTransaction = new CreateTransactionService();

  const transaction = await createTransaction.execute({
    title,
    type,
    value,
    category_title: category,
  });

  return res.json(transaction);
});

export default transactionsRouter;
