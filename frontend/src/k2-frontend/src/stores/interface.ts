export interface AggregationType {
    budget: number;
    consum: number;
    balance: number;
}

export interface Budget {
    account: string;
    amount: number;
}

export interface Performance {
    account: string;
    amount: number;
    balance: number;
}

export interface AccountMaster {
    account_en: string;
    account_jp: string;
}

export interface PresentData {
    depositDate: number;
    amount: number;
    note?: string;
    isEdit?: boolean
}