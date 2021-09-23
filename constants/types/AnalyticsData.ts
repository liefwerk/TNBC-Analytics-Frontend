export interface Treasury {
  uuid: string,
  account_number: string,
  balance: number,
  total_tnbc_spent: number,
  total_transactions: number,
  last_transaction_amount: number,
  last_transaction_at: string,
  updated_at: string
}

export interface Government {
  uuid: string,
  balance: number,
  total_tnbc_incoming: number,
  total_tnbc_spent: number,
  total_transactions: number,
  last_transaction_amount: number,
  last_transaction_at: string,
  updated_at: string
}