import { FormEvent ,useState} from 'react';
import { Container, TransactionTypeContainer, RadioBox} from './style';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import Modal from 'react-modal';
import { api } from '../../Services/api';
import { useTransactions } from '../../hooks/useTransactions';

interface HeaderProps{
    isOpen: boolean;
    onRequestClose: () => void;
}

export function TransactionsModal({isOpen, onRequestClose}: HeaderProps){

    const { createTransactions } = useTransactions();

    const [type, setType]             = useState('deposit');
    const [title, setTitle]           = useState('');
    const [amount, setAmount]         = useState(0);
    const [category, setCategory]     = useState('');

    async function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault();

        await createTransactions({
            title,
            amount,
            category,
            type
        });

        setTitle('');
        setAmount(0);
        setType('deposit');
        setCategory('');
        
        onRequestClose();
    }

    return(
    <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
    >
      <button 
        type="button" 
        onClick={ onRequestClose} 
        className="react-modal-close"
      >
        <img src={ closeImg } alt="Fechar modal" />
       </button>
        <Container onSubmit={ handleCreateNewTransaction}>
            <h2>Cadastrar Transação</h2>
            <input 
                placeholder="Title" 
                value={title}
                onChange={event => setTitle(event.target.value)}
            />
            <input 
                placeholder="Amount" 
                type="number" 
                value={amount}
                onChange={event => setAmount(Number(event.target.value))}
            />
            <TransactionTypeContainer>
                <RadioBox 
                    type="button"
                    onClick={ () => { setType('deposit') }}
                    isActive={type === 'deposit'}
                    activeColor="green"
                >
                    <img src={ incomeImg } alt="Entrada" />
                    <span>Entrada</span>
                </RadioBox>
                <RadioBox
                    type="button"
                    onClick={ () => { setType('withdraw') }}
                    isActive={type === 'withdraw'}
                    activeColor="red"
                >
                    <img src={ outcomeImg } alt="Saída" />
                    <span>Saída</span>
                </RadioBox>
            </TransactionTypeContainer>
            <input 
                placeholder="Category" 
                value={category}
                onChange={event => setCategory(event.target.value)}
            />
            <button type="submit">Salvar</button>

        </Container>

    </Modal>
    );
}