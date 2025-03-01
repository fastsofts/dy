interface DataItem {
    id: number;
    title: string;
    description:string;
    icon:string;
    data: {
        [key: string]: number | { [month: string]: number } | { [employee: string]: number }; 
    };
    in: string[];
    type:string;
    chart:string;
    filter:string[];
    default:string;
    split:boolean;
}

export interface DataState {
    items: DataItem[]; // Array of DataItem
    loading: boolean;
    error: string | null;
}