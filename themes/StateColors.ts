import { Palette } from './Palette';


export const stateColors = {
    // Default/Rest state
    'rest-textColor': Palette.dark[900],
    'rest-backgroundColor': 'transparent',
    'rest-borderColor': Palette.gray[200],
    'rest-iconColor': Palette.dark[500],

    // Hover state
    'hover-textColor': Palette.dark[900],
    'hover-backgroundColor': Palette.gray[50],
    'hover-borderColor': Palette.gray[300],
    'hover-iconColor': Palette.dark[600],

    // Pressed/Active state
    'pressed-textColor': Palette.dark[900],
    'pressed-backgroundColor': Palette.gray[100],
    'pressed-borderColor': Palette.gray[400],
    'pressed-iconColor': Palette.dark[700],

    // Disabled state
    'disabled-textColor': Palette.gray[400],
    'disabled-backgroundColor': Palette.gray[50],
    'disabled-borderColor': Palette.gray[100],
    'disabled-iconColor': Palette.gray[300],

    // Focused state
    'focused-textColor': Palette.dark[900],
    'focused-backgroundColor': 'transparent',
    'focused-borderColor': Palette.primary[500],
    'focused-iconColor': Palette.primary[500],
    'focused-outlineColor': `${Palette.primary[100]}80`, // 50% opacity

    // Error state
    'error-textColor': Palette.red[700],
    'error-backgroundColor': Palette.red[50],
    'error-borderColor': Palette.red[500],
    'error-iconColor': Palette.red[500],

    // Success state
    'success-textColor': Palette.green[700],
    'success-backgroundColor': Palette.green[50],
    'success-borderColor': Palette.green[500],
    'success-iconColor': Palette.green[500],

    // Warning state
    'warning-textColor': Palette.yellow[700],
    'warning-backgroundColor': Palette.yellow[50],
    'warning-borderColor': Palette.yellow[500],
    'warning-iconColor': Palette.yellow[500],

    // Selected state
    'selected-textColor': Palette.primary[700],
    'selected-backgroundColor': Palette.primary[50],
    'selected-borderColor': Palette.primary[500],
    'selected-iconColor': Palette.primary[500],
};