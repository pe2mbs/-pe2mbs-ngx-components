import { IMbsThemeItem } from "projects/pe2mbs/ngx-mbs-theme-select/src/public-api";


export const FakeThemes: IMbsThemeItem[] = [
    {
        displayName: 'Orange theme',
        name: 'orange-theme',
        isDark: false,
    },
    {
        displayName: 'Dark theme',
        name: 'dark-theme',
        isDark: false,
    },
    {
        displayName: 'Light theme',
        name: 'light-theme',
        isDark: false,
        isDefault: true,
    },
    {
        displayName: 'Worldline theme',
        name: 'worldline-theme',
        isDark: false,
        isDefault: false,
    },
    {
        displayName: 'Equens theme',
        name: 'equens-theme',
        isDark: false,
        isDefault: true,
    },
    {
        displayName: 'Development theme',
        name: 'dev-theme',
        isDark: false,
        isDefault: true,
    },
];
