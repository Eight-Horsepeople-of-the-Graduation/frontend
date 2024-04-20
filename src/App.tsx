import { useState } from "react";
import CustomModal from "./components/UI/CustomModal/CustomModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <CustomModal isModalOpen={isModalOpen} closeModal={closeModal}>
        <h1>Modal Content</h1>
        <p>This is a modal content</p>
      </CustomModal>
      <p>Test</p>
      <button onClick={openModal}>Open Modal</button>
      <button onClick={closeModal}>Close Modal</button>
    </>
  );
}

export default App;
