import { createTheme, ResponsiveValue } from "@shopify/restyle";
import { colors } from "./Colors";
import { spacings as spacing } from "./Spacings";


const theme = createTheme({
    colors,
    spacing,
});

type ThemeProps = typeof theme;
export { 
    theme, 
    ThemeProps 
};