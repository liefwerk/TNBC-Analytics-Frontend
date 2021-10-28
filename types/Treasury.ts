export interface Analytics {
	balance: number,
	lastTransaction: number,
	lastTransactionDate: string,
	totalOfTransactions: number,
}

export interface FormatedTransaction {
	date: string,
	amount: number,
	recipientPublicKey: string
}