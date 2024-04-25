// rootReducer.js

import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import AuthUserReducer from './AuthUserReducer';
import OtherReducer from './OtherReducer';
import EditProfileModalReducer from './EditProfileModalReducer';
import CropImageModalReducer from './CropImageModalReducer';
import AddEditUserModalReducer from './AddEditUserModalReducer';
import AddEditDesignationModalReducer from './AddEditDesignationModalReducer';
import AddEditFoldersPathModalReducer from './AddEditFoldersPathModalReducer';
import FilesListAndEditorReducer  from './FilesListAndEditorReducer';
import FolderFilesModalReducer  from './FolderFilesModalReducer';
import ModDetailsModalReducer from './ModDetailsModalReducer';
import FileDownloadHistoryReducer from './FileDownloadHistoryReducer';

const rootReducer = combineReducers({
    LoginReducer: LoginReducer,
    AuthUserReducer:AuthUserReducer,
    OtherReducer:OtherReducer,
    EditProfileModalReducer:EditProfileModalReducer,
    CropImageModalReducer:CropImageModalReducer,
    AddEditUserModalReducer:AddEditUserModalReducer,
    AddEditDesignationModalReducer:AddEditDesignationModalReducer,
    AddEditFoldersPathModalReducer:AddEditFoldersPathModalReducer,
    FilesListAndEditorReducer:FilesListAndEditorReducer,
    FolderFilesModalReducer:FolderFilesModalReducer,
    ModDetailsModalReducer:ModDetailsModalReducer,
    FileDownloadHistoryReducer:FileDownloadHistoryReducer
  // other reducers...
});

export default rootReducer;
