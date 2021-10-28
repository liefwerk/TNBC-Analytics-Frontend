export interface Pagination {
	count: number,
	next: null | string,
	previous: null | string,
	results: Array<any>
}  

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

export interface Analytics {
	circulating_supply: ​​number,
	max_supply: number,
	total_paid_as_bounty: number,
	total_paid_to_core_team: number,
	total_paid_to_projects: number,
	uuid: string
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