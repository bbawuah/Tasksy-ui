import { createContext, useContext } from 'react';

// Hier heb ik een context gemaakt voor de Auth token.
// Dit zou kunnen worden gerefactored naar de reducer volgens mij
export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}
