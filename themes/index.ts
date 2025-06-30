import { createTheme, ResponsiveValue } from "@shopify/restyle";
import { colors } from "./Colors";
import { spacings as spacing } from "./Spacings";
import { breakpoints } from './Breakpoints';
import { textVariants } from './TextVariants';
import { stateColors } from './StateColors';
import { fonts } from "./Fonts";

const theme = createTheme({
    colors,
    spacing,
    breakpoints,
    textVariants,
    stateColors,
    fonts,
    dark: false
});

type ThemeProps = typeof theme;
export { 
    theme, 
    ThemeProps 
};