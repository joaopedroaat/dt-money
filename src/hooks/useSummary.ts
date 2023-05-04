import { useContext } from 'react'
import { TransactionsContext } from '../contexts/TransactionContext'

export function useSummary() {
  const { transactions } = useContext(TransactionsContext)

  return transactions.reduce(
    (acc, transaction) => {
      const price = transaction.price

      if (transaction.type === 'income') {
        acc.income += price
        acc.total += price
      } else {
        acc.outcome += price
        acc.total -= price
      }

      return acc
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    },
  )
}
