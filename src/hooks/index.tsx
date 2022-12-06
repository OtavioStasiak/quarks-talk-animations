import React, {useState, useEffect, createContext, useContext, useCallback,} from "react";


type QuestionContextData = {
    validateFirstQuestion: (list: any[]) => boolean;
    validateSecondQuestion: (pickerItem: string) => boolean;
    validateThirdQuestion: (house: string) => boolean;
    validateForthQuestion: (name: string) => boolean;
};

type QuestionProviderProps = {
  children: React.ReactNode;
};

export const QuestionContext = createContext({} as QuestionContextData);

function QuestionProvider({ children }: QuestionProviderProps) {
    
    const validateFirstQuestion = useCallback((list: any[]) => {
        const isCorrect = list.some((item: any) => item.id === 3 || item.id === 5) === false && list.length === 4;
        return isCorrect;
    }, []);

    const validateSecondQuestion = useCallback((pickerItem: string) => {
      const isCorrect = pickerItem === "Duas Pizzas";
      return isCorrect;
    }, []);

    const validateThirdQuestion = useCallback((house: string) => {
      const isCorrect = house === "slytherin";
      return isCorrect;
    }, []);

    const validateForthQuestion = useCallback((name: string) => {
      const isCorrect = name === "Terry";
      return isCorrect;
    }, []);


    return (
        <QuestionContext.Provider 
        value={{
            validateFirstQuestion,
            validateSecondQuestion,
            validateThirdQuestion,
            validateForthQuestion
        }}>
          {children}
        </QuestionContext.Provider>
      )
    }

    function useQuestions() {
        const context = useContext(QuestionContext);
      
        return context;
      }

      export {
        QuestionProvider,
        useQuestions
      }