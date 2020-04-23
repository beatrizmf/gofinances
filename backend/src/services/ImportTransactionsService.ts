import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import loadCSV from '../helpers/loadCSV';
import Transaction from '../models/Transaction';
import CreateTransactionService from './CreateTransactionService';

type FileLine = Array<[string, 'income' | 'outcome', number, string]>;

class ImportTransactionsService {
  async execute(fileName: string): Promise<Transaction[]> {
    const createTransaction = new CreateTransactionService();

    const filePath = path.join(uploadConfig.director, fileName);

    const transactionsToImport: FileLine = await loadCSV(filePath);

    const createdTransactions: Transaction[] = [];

    for (const transaction of transactionsToImport) {
      const [title, type, value, category_title] = transaction;

      const createdTrasaction = await createTransaction.execute({
        title,
        type,
        value,
        category_title,
      });

      createdTransactions.push(createdTrasaction);
    }

    await fs.promises.unlink(filePath);

    return createdTransactions;
  }
}

export default ImportTransactionsService;
