import {
    PROFILE_PICTURE_MENU_ANCHOR_EL,
    APP_BAR_HEIGHT,
    WINDOW_HEIGHT,
    DRAWER_TOGGLE,
    FOLDERS_LIST_MENU,
    ALL_FOLDERS_DETAILS,
    FOLDERS_MENU_BOTTOM_HEIGHT,
    SUBSCRIPTION_CONNECTED,
    CONFIG_DATA
} from '../actions/OtherActions';

const initialState = {
    profilePictureMenuAnchorEl: null,
    drawerToggle: false,
    appBarHeight:60,
    windowHeight:0,
    foldersListMenu:[],
    allFoldersDetails:[],
    foldersMenuBottomHeight:42,
    subscriptionConnected:false,
    configData:null
};

const OtherReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_PICTURE_MENU_ANCHOR_EL:
            return {
                ...state,
                profilePictureMenuAnchorEl: action.payload.profilePictureMenuAnchorEl
            };
            case APP_BAR_HEIGHT:
                return {
                    ...state,
                    appBarHeight: action.payload.appBarHeight
                };
                case   WINDOW_HEIGHT:  
                return {
                    ...state,
                    windowHeight: action.payload.windowHeight
                };
        case DRAWER_TOGGLE:
            return {
                ...state,
                drawerToggle: action.payload.drawerToggle
            };
            case FOLDERS_LIST_MENU:
                return {
                    ...state,
                    foldersListMenu: action.payload.foldersListMenu
                };
                case ALL_FOLDERS_DETAILS:
                return {
                    ...state,
                    allFoldersDetails: action.payload.allFoldersDetails
                };
                case FOLDERS_MENU_BOTTOM_HEIGHT:
                    return {
                        ...state,
                        foldersMenuBottomHeight: action.payload.foldersMenuBottomHeight
                    };
                case SUBSCRIPTION_CONNECTED:
                    return{
                        ...state,
                        subscriptionConnected: action.payload.subscriptionConnected
                    }
                    case CONFIG_DATA:
                        return{
                            ...state,
                            configData: action.payload.configData
                        }
            default:
                return state;
    }
};

export default OtherReducer;
