import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../contexts/TransactionContext'
import { useMemo } from 'react'

export function useSummary() {
  const transactions = useContextSelector(
    TransactionsContext,
    (context) => context.transactions,
  )

  return useMemo(
    () =>
      transactions.reduce(
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
      ),
    [transactions],
  )
}
