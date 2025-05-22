import { Box, InputLabel, MenuItemProps } from "@mui/material";
import { InputLabelProps } from "@mui/material";
import { Select, styled, MenuItem, SelectProps } from "@mui/material";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
type TCustomSelect = SelectProps<string> & {
  options: { label: string; value: string }[]
  placeholder: string

};
const StyledSelect = styled(Select)<SelectProps<string>>(({ theme }) => ({
    "& .MuiSelect-select.MuiSelect-outlined": {
        padding: "10px 10px 10px 12px !important",
        height: "40px",
        boxSizing: "border-box"
    }
}));
const StyledMenuItem = styled(MenuItem)<MenuItemProps>(({ theme }) => ({

}));
const CustomPlaceHolder = styled(InputLabel)<InputLabelProps>(({ theme }) => ({
    position: "absolute",
    top: "0",
    left: 0,
    fontSize: "14px",
    color: theme.palette.text.secondary,
    padding: "10px 10px 10px 12px",
}));
const CustomSelect = (props: TCustomSelect) => {
    const { value, label, onChange, options, placeholder, fullWidth, ...rest } = props;
    const { t } = useTranslation();
    return (
        <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
            {
                !value.length && (
                    <CustomPlaceHolder>{ placeholder }</CustomPlaceHolder>
                )
            }
            <StyledSelect
                label={label}
                fullWidth={fullWidth}
                value={value}
                onChange={onChange}
                {...rest}
            >
                { options?.length > 0 ? options ?.map( (option, _index) => {
                    return (
                    <StyledMenuItem key={_index} value={option.value}>
                        {option.label}
                    </StyledMenuItem>
                    );
                }) : (
                    <StyledMenuItem>
                        {t("no_data")}
                    </StyledMenuItem> 
                )}
            </StyledSelect>
        </Box>
    );
};
export default CustomSelect;