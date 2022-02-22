import { createContext, ReactNode, useEffect, useState ,useContext } from "react";
import { api } from "../Services/api";


interface Transaction{
    id: number,
    title : string,
    amount : number,
    type : string,
    category : string,
    createdAt : string,
}

interface TransactionProviderProps{
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransactions: (transaction: TransactionInput) => Promise<void>;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

export const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionsProvider({children}: TransactionProviderProps)
{
    const [transactions, setTransactions] =  useState<Transaction[]>([]);

    useEffect(() =>{
        api.get('/transactions')
        .then(response => setTransactions(response.data.transactions))
        .catch(error => {
            console.log(error)
        })
    },[]);

    async function createTransactions(transactionInput: TransactionInput){
        const response = await api.post('/transactions',{
            ...transactionInput,
            createdAt: new Date()
        })
        const transaction = response.data.transaction

        setTransactions([
            ...transactions,
            transaction
        ])

    }

    return (<TransactionsContext.Provider value={{transactions,createTransactions}}>{children}</TransactionsContext.Provider>);
}

export function useTransactions() {
    const context = useContext(TransactionsContext);
  
    return context;
  }