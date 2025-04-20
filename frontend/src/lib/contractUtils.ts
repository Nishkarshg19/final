import { ethers } from 'ethers';
import MentorMatchABI from '../contracts/MentorMatch.json'; // compiled ABI
import { CONTRACT_ADDRESS } from '../config';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const getProvider = () => {
  if (!window.ethereum) throw new Error('MetaMask not installed');
  return new ethers.BrowserProvider(window.ethereum);
};

export const getContract = async () => {
  const provider = getProvider();
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, MentorMatchABI, signer);
};

// Example: Register as a mentor
export const registerMentor = async (name: string, expertise: string) => {
  const contract = await getContract();
  const tx = await contract.registerMentor(name, expertise);
  await tx.wait();
};

// Example: Fetch all mentors
export const getMentors = async (): Promise<any[]> => {
  const contract = await getContract();
  return await contract.getAllMentors();
};