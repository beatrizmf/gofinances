/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable import/first */

jest.mock('../utils/formatValue.ts', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((value: number) => {
    switch (value) {
      case 6000:
        return '$ 6.000,00';
      case 50:
        return '$ 50,00';
      case 5950:
        return '$ 5.950,00';
      case 1500:
        return '$ 1.500,00';
      case 4500:
        return '$ 4.500,00';
      default:
        return '';
    }
  }),
}));

import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import api from '../services/api';
import App from '../App';

const apiMock = new MockAdapter(api);

const wait = (amount = 0): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, amount));
};

const actWait = async (amount = 0): Promise<void> => {
  await act(async () => {
    await wait(amount);
  });
};

describe('Dashboard', () => {
  it('should be able to list the total balance inside the cards', async () => {
    const { getByTestId } = render(<App />);

    apiMock.onGet('transactions').reply(200, {
      transactions: [
        {
          id: '807da2da-4ba6-4e45-b4f8-828d900c2adf',
          title: 'Loan',
          type: 'income',
          value: 1500,
          category: {
            id: '12a0cff7-8691-456d-b1ad-172d777f1942',
            title: 'Others',
            created_at: '2020-04-17T19:05:34.000Z',
            updated_at: '2020-04-17T19:05:34.000Z',
          },
          category_id: '12a0cff7-8691-456d-b1ad-172d777f1942',
          created_at: '2020-04-17T19:05:34.000Z',
          updated_at: '2020-04-17T19:05:34.000Z',
        },
        {
          id: '3cd3b0e3-73ef-44e9-9f19-8d815eaa7bb4',
          title: 'Computer',
          type: 'income',
          value: 4500,
          category: {
            id: '12a0cff7-8691-456d-b1ad-172d777f1942',
            title: 'Sell',
            created_at: '2020-04-18T19:05:34.000Z',
            updated_at: '2020-04-17T19:05:34.000Z',
          },
          category_id: '12a0cff7-8691-456d-b1ad-172d777f1942',
          created_at: '2020-04-18T19:05:34.000Z',
          updated_at: '2020-04-18T19:05:34.000Z',
        },
        {
          id: 'fb21571c-1087-4427-800c-3c30a484decf',
          title: 'Website Hosting',
          type: 'outcome',
          value: 50,
          category: {
            id: '12a0cff7-8691-456d-b1ad-172d777f1942',
            title: 'Hosting',
            created_at: '2020-04-17T19:05:34.000Z',
            updated_at: '2020-04-17T19:05:34.000Z',
          },
          category_id: '12a0cff7-8691-456d-b1ad-172d777f1942',
          created_at: '2020-04-19T19:05:34.000Z',
          updated_at: '2020-04-19T19:05:34.000Z',
        },
      ],
      balance: {
        income: 6000,
        outcome: 50,
        total: 5950,
      },
    });

    await actWait();

    expect(getByTestId('balance-income')).toHaveTextContent('$ 6.000,00');

    expect(getByTestId('balance-outcome')).toHaveTextContent('$ 50,00');

    expect(getByTestId('balance-total')).toHaveTextContent('$ 5.950,00');
  });

  it('should be able to list the transactions', async () => {
    const { getByText } = render(<App />);

    apiMock.onGet('transactions').reply(200, {
      transactions: [
        {
          id: '807da2da-4ba6-4e45-b4f8-828d900c2adf',
          title: 'Loan',
          type: 'income',
          value: 1500,
          category: {
            id: '12a0cff7-8691-456d-b1ad-172d777f1942',
            title: 'Others',
            created_at: '2020-04-17T19:05:34.000Z',
            updated_at: '2020-04-17T19:05:34.000Z',
          },
          category_id: '12a0cff7-8691-456d-b1ad-172d777f1942',
          created_at: '2020-04-17T19:05:34.000Z',
          updated_at: '2020-04-17T19:05:34.000Z',
        },
        {
          id: '3cd3b0e3-73ef-44e9-9f19-8d815eaa7bb4',
          title: 'Computer',
          type: 'income',
          value: 4500,
          category: {
            id: '12a0cff7-8691-456d-b1ad-172d777f1942',
            title: 'Sell',
            created_at: '2020-04-18T19:05:34.000Z',
            updated_at: '2020-04-17T19:05:34.000Z',
          },
          category_id: '12a0cff7-8691-456d-b1ad-172d777f1942',
          created_at: '2020-04-18T19:05:34.000Z',
          updated_at: '2020-04-18T19:05:34.000Z',
        },
        {
          id: 'fb21571c-1087-4427-800c-3c30a484decf',
          title: 'Website Hosting',
          type: 'outcome',
          value: 50,
          category: {
            id: '12a0cff7-8691-456d-b1ad-172d777f1942',
            title: 'Hosting',
            created_at: '2020-04-17T19:05:34.000Z',
            updated_at: '2020-04-17T19:05:34.000Z',
          },
          category_id: '12a0cff7-8691-456d-b1ad-172d777f1942',
          created_at: '2020-04-19T19:05:34.000Z',
          updated_at: '2020-04-19T19:05:34.000Z',
        },
      ],
      balance: {
        income: 6000,
        outcome: 50,
        total: 5950,
      },
    });

    await actWait();

    expect(getByText('Loan')).toBeTruthy();
    expect(getByText('$ 1.500,00')).toBeTruthy();
    expect(getByText('Others')).toBeTruthy();

    expect(getByText('Computer')).toBeTruthy();
    expect(getByText('$ 4.500,00')).toBeTruthy();
    expect(getByText('Sell')).toBeTruthy();

    expect(getByText('Website Hosting')).toBeTruthy();
    expect(getByText('- $ 50,00')).toBeTruthy();
    expect(getByText('Hosting')).toBeTruthy();
  });

  it('should be able to navigate to the import page', async () => {
    const { getByText } = render(<App />);

    await actWait(500);

    fireEvent.click(getByText('Import'));

    await actWait();

    expect(window.location.pathname).toEqual('/import');
  });

  test('should be able to upload a file', async () => {
    const { getByText, getByTestId } = render(<App />);

    fireEvent.click(getByText('Import'));

    await actWait();

    const input = getByTestId('upload');

    const file = new File(
      [
        'title, type, value, category\
        Loan, income, 1500, Others\
        Website Hosting, outcome, 50, Others\
        Ice cream, outcome, 3, Food',
      ],
      'import.csv',
      {
        type: 'text/csv',
      },
    );

    Object.defineProperty(input, 'files', {
      value: [file],
    });

    fireEvent.change(input);

    await actWait();

    expect(getByText('import.csv')).toBeTruthy();

    await actWait();
  });
});
