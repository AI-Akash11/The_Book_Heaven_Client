import React from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeProvider = ({children}) => {
    return (
        <ThemeContext>
            {children}
        </ThemeContext>
    );
};

export default ThemeProvider;