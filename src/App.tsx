import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import { useState } from "react";
import Modal from 'react-modal';
import { TransactionsModal } from "./components/TransactionsModal";
import { TransactionsProvider } from "./hooks/useTransactions";

export function App() {

  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  Modal.setAppElement('#root');

  return (
    <TransactionsProvider>
      <Header onOpenModal={openModal}/>
      <Dashboard/>
      <TransactionsModal isOpen={modalIsOpen} onRequestClose={closeModal}/>
      <GlobalStyle/>
    </TransactionsProvider>
  );
}

