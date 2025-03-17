import {ReactNode} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFnsV3";

export default function LocateProvider({children}:Readonly<{children: ReactNode}>){
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            {children}
        </LocalizationProvider>
    )
}