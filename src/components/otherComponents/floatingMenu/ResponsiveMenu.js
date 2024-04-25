import React,{useEffect,useState,useLayoutEffect} from "react";
import PropTypes from "prop-types";
import ContainerDimensions from "react-container-dimensions";
import ListMenu from "./ListMenu.js";
import {
  MenuItem,
  Tooltip
} from "@mui/material";
import Folder from "@mui/icons-material/Folder";
const styles = {
  menu_container: {
    display: "flex",
    width: "100%",
    margin: 0,
    padding: 0,
    background: "#505050",
    borderTop: "1px solid #505050",
    
  },
};
const menuItemStyles = {
  justifyContent: "center",
  display: "block",
  whiteSpace: "nowrap", 
  overflow: "hidden",
  textOverflow: "ellipsis", 
  paddingLeft: 6,
  paddingRight: 6,
  borderRight: "solid",
  borderRightWidth: 1,
  borderRightColor: "#505050",
  background: "#e14425",
  color:"white",
  fontWeight:"700",
};
const menuItemContainerStyles = {
  display: "block",
  overflow: "hidden",
}
const SelectedItemStyle = {
  background: "rgb(128 30 11)",
  borderBottom: "0",


}
const ItemCountStyle = {
  width: "40px",
  height: "40px",
  background: "rgb(223, 68, 38)",
  position: "absolute",
  top: "-30px",
  zIndex: "100000",
  left: "90px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  fontWeight: "900",
  borderRadius: "50%",
  border: "1px solid #bb4242"

}

const getIcon = (item, i, width, selectedItemId,filesListAndEditorFileListShowDeletedItems,firstMenuWidth) => {
 

  if (item.seperator) {
    return undefined;
  } else if (item.menu) {
    return item.getSelectMenuItems();
  } else {
    const borderRight =
      i == 0
        ? {
            borderLeft: "solid",
            borderLeftWidth: 1,
            borderLeftColor: "#494949",
          }
        : null;
 
    return (
      <>
      <Tooltip arrow title={item.text}>
      <MenuItem
       className="menuItem"
        style={
          {
            width: width,
            paddingTop: 8,
            paddingBottom: 8,
            ...menuItemStyles,
            ...borderRight,
            ...(selectedItemId == item.id ? SelectedItemStyle: null),
          }
          
        }
        disableGutters={true}
        key={i}
        disabled={item.disabled}
        onClick={item.onClick}
      >
        <Folder style={{width: 15,
    height: 15,
    marginRight: 0,marginBottom: -2}} /> {item.text}
        
      </MenuItem>
      </Tooltip>
      {(item.unDeletedCount + item.deletedCount) > 0 && filesListAndEditorFileListShowDeletedItems && 
       <span style={ItemCountStyle}>{item.unDeletedCount + item.deletedCount}</span>}
 {(item.unDeletedCount ) > 0 && !filesListAndEditorFileListShowDeletedItems && 
       <span style={{...ItemCountStyle,left:(i * firstMenuWidth)  + 80 }}>{item.unDeletedCount }</span>}
       
   </>
   
    );
  }
};

const Menu = (props) => {
  const [firstMenuWidth, setFirstMenuWidth] = useState(0);
  const calculateMenuItemWidth = () => {
    const firstMenuItem = document.querySelector('.menuItem');
    if(firstMenuItem)
    setFirstMenuWidth(firstMenuItem.getBoundingClientRect().width)
   };
   useLayoutEffect(()=>{
    calculateMenuItemWidth();
   })
  useEffect(() => {
    calculateMenuItemWidth(); // Initial calculation

    // Event listener for window resize to recalculate width
    window.addEventListener('resize', calculateMenuItemWidth);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', calculateMenuItemWidth);
    };
  }, []); 
  const {
    iconMenuColor,
    width,
    marginCorrection,
    menuWidth,
    menuList,
    selectedItemId,
    filesListAndEditorFileListShowDeletedItems,
  } = props;

  let icons = [];
  let menus = [];

  const visibleItems = menuList.filter((item) => item.hidden !== true);
  const mWidth = menuWidth !== undefined ? menuWidth : 130;
  const correction = marginCorrection !== undefined ? marginCorrection : 220;
  const breackLimit = visibleItems.length * mWidth;

  const hiddenWidth = breackLimit - width - correction;
  const hiddenMenus = Math.ceil(hiddenWidth / mWidth) + 1;

  if (hiddenMenus > 0) {
    menus = visibleItems.slice(
      visibleItems.length - hiddenMenus,
      visibleItems.length
    );
    icons = visibleItems.slice(0, hiddenMenus * -1);
  } else {
    menus = [];
    icons = visibleItems;
  }

 return (
    <div style={styles.menu_container}>
      {icons.map((item, i) => getIcon(item, i, mWidth, selectedItemId,filesListAndEditorFileListShowDeletedItems,firstMenuWidth))}

      {menus.length != 0 && (
       
        <ListMenu
          selectedItemId={selectedItemId}
          items={menus}
          iconMenuColor={iconMenuColor}
          selectedItemStyle = {SelectedItemStyle}
          filesListAndEditorFileListShowDeletedItems={filesListAndEditorFileListShowDeletedItems}
        />
      )}
    </div>
  );
};

const ResponsiveMenu = (props) => {
  return (
    <ContainerDimensions>
      {({ width }) => <Menu width={width} {...props} />}
    </ContainerDimensions>
  );
};

ResponsiveMenu.propTypes = {
  menuList: PropTypes.array.isRequired,
  menuWidth: PropTypes.number,
  marginCorrection: PropTypes.number,
};

export default ResponsiveMenu;
