import { ethers } from 'ethers';
import MentorMatchABI from '../contracts/MentorMatch.json';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

export const connectWallet = async () => {
  if (!window.ethereum) {
    throw new Error('Please install MetaMask to connect your wallet');
  }

  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, MentorMatchABI, signer);
    
    return {
      address: await signer.getAddress(),
      contract,
      signer,
    };
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
};

export const registerUser = async (contract: ethers.Contract, name: string, role: string) => {
  try {
    const tx = await contract.registerUser(name, role);
    await tx.wait();
    return tx;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const submitAssignment = async (
  contract: ethers.Contract,
  title: string,
  description: string,
  ipfsHash: string
) => {
  try {
    const tx = await contract.submitAssignment(title, description, ipfsHash);
    await tx.wait();
    return tx;
  } catch (error) {
    console.error('Error submitting assignment:', error);
    throw error;
  }
};

export const approveAssignment = async (
  contract: ethers.Contract,
  studentAddress: string,
  assignmentIndex: number
) => {
  try {
    const tx = await contract.approveAssignment(studentAddress, assignmentIndex);
    await tx.wait();
    return tx;
  } catch (error) {
    console.error('Error approving assignment:', error);
    throw error;
  }
};