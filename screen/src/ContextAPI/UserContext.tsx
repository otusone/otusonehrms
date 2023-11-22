import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

// Define the API data type
type UserData = {
    // Define the structure of the data received from the API
    // For example, assuming the API returns a user object:
    userId: number;
    username: string;
    email: string;
    password: string;
    role: string;
    // Add other fields as needed
};

// Define the context type
type UserDataContextType = {
    userData: UserData | null;
    setUserData: Dispatch<SetStateAction<UserData | null>>;
    // You may include additional functions or state related to API data management
};

// Create the context
const ApiDataContext = createContext<UserDataContextType | undefined>(undefined);

// Define a custom hook to use the context
export const useUserDataContext = () => {
    const context = useContext(ApiDataContext);
    if (!context) {
        throw new Error('useApiDataContext must be used within an ApiDataContextProvider');
    }
    return context;
};

// Define the provider component
type ApiDataContextProviderProps = {
    children: ReactNode;
};

export const ApiDataContextProvider = ({ children }: ApiDataContextProviderProps) => {
    const [userData, setUserData] = useState<UserData | null>(null);

    const contextValue: UserDataContextType = {
        userData,
        setUserData,
        // You may add more functions or state here as needed
    };

    return (
        <ApiDataContext.Provider value={contextValue}>
            {children}
        </ApiDataContext.Provider>
    );
};
