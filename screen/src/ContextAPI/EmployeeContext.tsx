import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

// Define the API data type
type EmployeeData = {
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
type EmployeeDataContextType = {
    employeeData: EmployeeData | null;
    setEmployeeData: Dispatch<SetStateAction<EmployeeData | null>>;
    // You may include additional functions or state related to API data management
};

// Create the context
const EmployeeDataContext = createContext<EmployeeDataContextType | undefined>(undefined);

// Define a custom hook to use the context
export const useEmployeeDataContext = () => {
    const context = useContext(EmployeeDataContext);
    if (!context) {
        throw new Error('useApiDataContext must be used within an ApiDataContextProvider');
    }
    return context;
};

// Define the provider component
type EmployeeDataContextProviderProps = {
    children: ReactNode;
};

export const EmployeeDataContextProvider = ({ children }: EmployeeDataContextProviderProps) => {
    const [employeeData, setEmployeeData] = useState<EmployeeData | null>(null);

    const contextValue: EmployeeDataContextType = {
        employeeData,
        setEmployeeData,
        // You may add more functions or state here as needed
    };

    return (
        <EmployeeDataContext.Provider value={contextValue}>
            {children}
        </EmployeeDataContext.Provider>
    );
};
