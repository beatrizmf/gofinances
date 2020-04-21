import { Router } from 'express';

import CreateTransactionService from '../services/CreateTransactionService';

const transactionsRouter = Router();

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
