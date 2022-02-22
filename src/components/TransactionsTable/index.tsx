import { useTransactions } from '../../hooks/useTransactions';
import { RepositoryItem } from './Itens';
import { Container} from './style';

export function TransactionsTable(){

    const {transactions} = useTransactions();
   
    return(
    <Container>
        <table>
            <thead>
                <tr>
                    <th>Titulo</th>
                    <th>Valor</th>
                    <th>Categoria</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map(item => {
                    return <RepositoryItem key={item.id} data={item} />
                })}
            </tbody>
        </table>
    </Container>
    );
}