'use client'
import {ReactNode} from "react";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v15-appRouter";
import {
    createTheme as createThemeMaterial,
    CssBaseline,
    PaletteMode,
    Theme,
    ThemeProvider as ThemeProviderMaterial
} from "@mui/material";

import {ptBR as dataGridPtBR} from '@mui/x-data-grid/locales';
import {ptBR as corePtbr} from '@mui/material/locale';
import {ptBR} from '@mui/x-date-pickers/locales';

import {useSelector} from "react-redux";
import {RootState} from "@/lib/store";
import InterfaceUser from "@/interfaces/Userinterface";
import LocateProvider from "@/providers/LocalizationProvider";


function createTheme(mode: PaletteMode): Theme{
    return createThemeMaterial({
        palette: {
            mode: mode
        },
        typography: {
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        components:{
            MuiTextField:{
                styleOverrides:{
                    root: {
                        '& ::-webkit-inner-spin-button': {
                            display: 'none'
                        }
                    }
                }
            }
        },
        ...(mode === 'dark' ? {
            primary: { main: '#90caf9' },
            background: { default: '#121212', paper: '#424242' },
        } : {
            primary: { main: '#1976d2' },
            background: { default: '#fff', paper: '#fff' },
        })
    },
        ptBR,
        dataGridPtBR,
        corePtbr
    )

}

export default function ThemeProvider({children}:Readonly<{children: ReactNode}>){
    const user: InterfaceUser = useSelector((state: RootState) => state.local.user) as InterfaceUser

    return(
        <AppRouterCacheProvider>
            <ThemeProviderMaterial theme={createTheme(user.theme)} disableTransitionOnChange>
                <CssBaseline enableColorScheme/>
                <LocateProvider>
                    {children}
                </LocateProvider>
            </ThemeProviderMaterial>
        </AppRouterCacheProvider>
    )
}