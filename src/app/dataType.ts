interface Data {
    [key: string]: number | string;
}
  
interface Insights {
    [key: string]: string[];
}
  
interface DataItem {
    id: number;
    title: string;
    description:string;
    icon:string;
    data: Data | { [key: string]: Data }; 
    in: string[];
    type:string;
    chart:string;
    filter:string[];
    default:string;
    split:boolean;
    insights: Insights;
}

export interface DataState {
    items: DataItem[]; // Array of DataItem
    loading: boolean;
    error: string | null;
}