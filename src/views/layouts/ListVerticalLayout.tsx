import { NextPage } from "next";
import * as React from "react";
import {
  Collapse,
  ListItemButton,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  styled,
  Tooltip,
  List,
} from "@mui/material";
import { useRouter } from "next/router";

import { VerticalItem } from "@/configs/layout";
import IconifyIcon from "@/components/Icon";

type TProps = {
  open: boolean;
};
const StyleListItemText = styled(ListItemText)(({ theme }) => ({
  "& .MuiTypography-root": {
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
    whiteSpace: "nowrap",
  },
}));
const ListVerticalLayout: NextPage<TProps> = ({ open }) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const [activePath, setActivePath] = React.useState<string>("");
  const router = useRouter();
  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  React.useEffect(() => {
    if (!open) {
      setOpenIndex(null);
    }
  }, [open]);
  const handlePath = (path: string) => {
    if (path) {
      router.push(path);
      setActivePath(path);
    }
  };
  React.useEffect(() => {
    setActivePath(router.pathname);
  }, [router.pathname]);
  console.log(open, "openIndex");
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {/* Danh sách tính năng */}
        </ListSubheader>
      }
    >
      {VerticalItem?.map((item, _index) => (
        <React.Fragment key={_index}>
          <ListItemButton onClick={() => handleClick(_index)}>
            <ListItemIcon>
              <IconifyIcon icon={item.icon} width="24" height="24" />
            </ListItemIcon>
            <ListItemText primary={item.title} />
            {item.children ? (
              openIndex === _index ? (
                <IconifyIcon icon="si:expand-less-fill" width="24" height="24" />
              ) : (
                <IconifyIcon icon="si:expand-more-duotone" width="24" height="24" />
              )
            ) : null}
          </ListItemButton>

          {item.children && (
            <Collapse in={openIndex === _index} timeout={300} unmountOnExit easing="ease-in-out">
              <List component="div" disablePadding>
                {item.children.map((child, childIndex) => {
                  const isActive = activePath === child.path;
                  return (
                    <ListItemButton
                      sx={{
                        pl: 4,
                        bgcolor: isActive ? "primary.main" : "inherit",
                        color: isActive ? "white" : "inherit",
                        "&:hover": {
                          bgcolor: isActive ? "primary.dark" : "action.hover",
                        },
                      }}
                      key={childIndex}
                      onClick={() => handlePath(child.path)}
                    >
                      <ListItemIcon color={isActive ? "white" : undefined}>
                        <IconifyIcon icon={child.icon} width="24" height="24" />
                      </ListItemIcon>
                      <Tooltip title={child.title}>
                        <StyleListItemText primary={child.title} />
                      </Tooltip>
                    </ListItemButton>
                  );
                })}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </List>
  );
};
export default ListVerticalLayout;
