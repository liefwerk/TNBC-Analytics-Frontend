export interface Block {
	balance_key: string,
	created_date: string,
	id: string,
	modified_date: string,
	sender: string,
	signature: string
}

export interface Transaction {
	amount: number,
	block: Block,
	fee: string,
	id: string,
	memo: string,
	recipient: string
}
