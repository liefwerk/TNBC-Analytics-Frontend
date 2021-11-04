export interface Analytics {
	balance: number,
	lastTransaction: number,
	lastTransactionDate: string,
	totalOfTransactions: number,
	lastTransactionKey: string
}

export interface FormatedTransaction {
	date: string,
	amount: number,
	recipientPublicKey: string
}

export interface FormatedPieChartTransaction {
	name: string,
	y: number
}

