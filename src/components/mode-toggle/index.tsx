import { IconButton } from "@mui/material";

import { useSettings } from "@/hooks/useSettings";
import { Mode } from "@/types/layouts";

import IconifyIcon from "../Icon";

type TProps = {

}
const ModeToggle = (props: TProps) => {
    const { settings, saveSettings } = useSettings();
    const handleModeChange = (mode:Mode) =>{
        saveSettings({ ...settings,mode });
    };
    const handleToggleMode = () =>{
        if ( settings.mode === "dark") {
            handleModeChange("light");
        } else {
            handleModeChange("dark");
        }
    };
    return (
        <IconButton color="inherit" onClick={ handleToggleMode }>
            <IconifyIcon icon={settings.mode === "light" ? "material-symbols-light:light-mode" : "material-symbols-light:dark-mode"} width="24" height="24" />
        </IconButton>
    );
};
export default ModeToggle;