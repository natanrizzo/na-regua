import { createTheme, ResponsiveValue } from "@shopify/restyle";
import { colors } from "./Colors";
import { spacings as spacing } from "./Spacings";
import { breakpoints } from './Breakpoints';
import { textVariants } from './TextVariants';
import { stateColors } from './StateColors';


const theme = createTheme({
    colors,
    spacing,
    breakpoints,
    textVariants,
    stateColors,
});

type ThemeProps = typeof theme;
export { 
    theme, 
    ThemeProps 
};