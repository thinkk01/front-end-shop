import { NextPage } from "next";
import * as React from "react";
import { Collapse, ListItemButton, ListItemText, ListSubheader } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import List from "@mui/material/List";

import { VerticalItem } from "@/configs/layout";
import IconifyIcon from "@/components/Icon";

type TProps = {
  open: boolean
}

const ListVerticalLayout: NextPage<TProps> = ({ open }) => {
    const [openIndex, setOpenIndex] = React.useState<number | null>(null);

    const handleClick = (index: number) => {
      setOpenIndex(openIndex === index ? null : index);
    };

    const handlePath = (path:string) => {
      if (path) {
        // navigate(path); // điều hướng tới path
      }
    };
    React.useEffect(() =>{
      if (!open){
        setOpenIndex(null);
      }
    },[open]);
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Danh sách tính năng
        </ListSubheader>
      }
    >
      {VerticalItem?.map((item, _index) => (
        <React.Fragment key={_index}>
          <ListItemButton onClick={() => handleClick( _index )}>
            <ListItemIcon><IconifyIcon icon={item.icon} width="24" height="24" /></ListItemIcon>
            <ListItemText primary={item.title} />
            {item.children ? (
              openIndex === _index ? <IconifyIcon icon="si:expand-less-fill" width="24" height="24" /> : <IconifyIcon icon="si:expand-more-duotone" width="24" height="24" />
            ) : null}
          </ListItemButton>

          {item.children && (
            <Collapse
              in={openIndex === _index}
              timeout={300}
              unmountOnExit
              easing="ease-in-out"
            >
              <List component="div" disablePadding>
                {item.children.map((child, childIndex) => (
                  <ListItemButton sx={{ pl: 4 }} key={childIndex} onClick={() => handlePath(child.path)}>
                    <ListItemIcon><IconifyIcon icon={child.icon} width="24" height="24" /></ListItemIcon>
                    <ListItemText primary={child.title} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </List>
    /* <ListItemButton onClick={handleClick}>
      <ListItemIcon>
      </ListItemIcon>
      <ListItemText primary="Inbox" />
      {openButton ? <IconifyIcon icon="si:expand-less-fill" width="24" height="24" /> : <IconifyIcon icon="si:expand-more-duotone" width="24" height="24" />}
    </ListItemButton>
    <Collapse in={openButton} timeout="auto" easing="ease-in-out" unmountOnExit>
      <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="Starred" />
        </ListItemButton>
        </Collapse> */
    );
};
export default ListVerticalLayout;