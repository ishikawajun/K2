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
    isEdit?: boolean;
}

export interface PresentData {
    depositDate: number;
    amount: number;
    note?: string;
    isEdit?: boolean;
}

export interface ParamMaster {
    category: string;
    key: string;
    paramName?: string;
    value?: string;
}

export interface ParamMasterBody {
    paramData: ParamMaster[]
}