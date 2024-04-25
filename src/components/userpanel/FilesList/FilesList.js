import React, { useEffect, useRef } from 'react';
import { Grid, Box, Typography, Container, IconButton, Tooltip, CircularProgress } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import clsx from 'clsx';
import { makeStyles, useTheme } from "@mui/styles";
import { connect } from "react-redux";
import VideocamIcon from '@mui/icons-material/Videocam';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import PhotoIcon from '@mui/icons-material/Photo';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
    setFilesListAndEditorModalToggle,
    setFilesListAndEditorSelectedFileItem,
    setFilesListAndEditorSelectedFolderId,
    setFilesListAndEditorFileListItems,
    setFilesListAndEditorFileListShowDeletedItems,
    setFilesListAndEditorArchiveDateFrom,
    setFilesListAndEditorArchiveDateTo,
    setFilesListAndEditorArchiveSearchText,
    setFilesListAndEditorArchiveFileListItems,
    setFilesListAndEditorAllFolderSearchDateFrom,
    setFilesListAndEditorAllFolderSearchDateTo,
    setFilesListAndEditorAllFolderSearchSearchText,
    setFilesListAndEditorAllFolderSearchFileListItems,
    setFilesListAndEditorQuickSearchText,
    setFilesListAndEditorQuickSearchIds
} from "../../../store/actions/FilesListAndEditorActions";
import ConditionalHighlightedTextTypography from '../../otherComponents/ConditionalHighlightedTextTypography';
import ScrollToTopButton from '../../otherComponents/ScrollToTopButton';
import resolvesettings from '../../resolvesettings';
import { gql, useSubscription, useLazyQuery } from "@apollo/client";
import resolveExtensions from './resolveExtensions';
import SearchWithDelay from '../../otherComponents/SearchWithDelay';
import _ from "lodash";
import DateRangeModal from '../../otherComponents/DateRangeModal/DateRangeModal';
import AllFolderSearchDateRangeModal from '../../otherComponents/AllFolderSearchDateRangeModal/AllFolderSearchDateRangeModal';
import FileListMenu from '../FileListMenu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import momenttz from "moment-timezone";
import UnreadFileManager from '../../../auth/UnreadFileManager';
import {
    setFoldersListMenu
  } from "../../../store/actions/OtherActions";
const useStyles = makeStyles((theme) => ({
    previewContainer: {
        backgroundColor: "black",
        height: 140,
        display: "flex!important",
        alignItems: "center",
        justifyContent: "center",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
    },
    itemIcon: {

        background: "white",
        width: "auto!important",
        height: "40%!important",
        transition: "opacity 0.2s,height 0.2s,fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important",
        opacity: "0.7"
    },
    videoListItemContainer: {
        width: "100%",
        marginBottom: 5,
        marginTop: 5,
        padding: "5px",
        cursor: "pointer",
        border: "1px solid #999999",
        '&:hover': {
            "& $itemIcon": {
                opacity: "1",
                height: "50%!important",
            }
        }
    },
    videoListItemContainerNewHighlight: {
        backgroundColor: "#ead437",
        backgroundImage: "linear-gradient(315deg, #ead437 0%, #efe9f4 74%)",
        padding: 5

    },
    filesListContainer: {
        paddingBottom: (state) => state.foldersMenuBottomHeight,

    },
    videoListItemContentContainer: {
        overflow: "hidden",
        marginTop: "7px!important"
    },
    videoListItemTitle: {
        paddingRight: 16,
    },
    videoListItemSkeleton: {
        paddingTop: 5
    },
    videoListItemMoreInfo: {

    },
    captionContainer: {
        display: "flex!important",
        justifyContent: "space-between"
    },
    fileSeletedItem: {
        border: "3px solid #999999",
       
    },
    fileIsDeleted: {
        background: "#f7d6d6",
        padding: "5px"
    },
    nofilesFoundText: {
        marginTop: "50px!important",
        marginLeft: "12px!important"
    },
    fileListTopActionBar: {
        display: "flex!important",
        background: "#505050",
        paddingLeft: "20px",
        paddingRight: "20px",
        height: 56
    },
    fileListGrid: {
        paddingLeft: "16px",
        paddingRight: "16px",

    },
    fileListTopActionBarFilesCount: {
        display: "flex!important",
        justifyContent: "end",
        alignItems: "center",
        margin: "0!important",
        width: "auto!important",
        flex: 1
    },
    selectedFoldernameTypography: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        textDecoration: "underline",
        fontWeight: "bold!important",
        color: "white",
        fontSize: "20px!important",
        marginRight: "20px!important"
    },
    videoItemArchiveDateTime: {
        fontSize: "12px!important",
        marginTop: "5px!important",
        color: "#e14425",
        fontWeight: "bold!important",
        fontStyle: "italic"
    },
    archiveSearchDetails: {
        paddingBottom: "0px!important",
        paddingTop: "10px!important",
        color: "white",
        [theme.breakpoints.down("sm")]: {
            fontSize: "12px!important",
        },
    },
    archiveBackButtonIcon: {
        color: "white"
    },
    fileListTopActionBarFilesCountText: {
        color: "white",
        fontWeight: "700!important",
        [theme.breakpoints.down("sm")]: {
            fontSize: "12px!important",
        },
    },
    searchbar: {
        background: "white"
    },
    dateRangeCalendarIcon: {
        color: "white"
    },
    dateRangeCalendarButton: {
        background: "#e14425"
    },
    allFolderSearchDateRangeCalendarIcon: {
        color: "white"
    },
    allFolderSearchDateRangeCalendarButton: {
        background: "#e14425",
        paddingLeft: "7px!important",
        borderLeft: "1px solid #d7d7d7!important"
    },
    archiveSearchDetailsContainer: {
        background: "#373737",
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
    }
}));

const FilesList = (props) => {

    const unreadFileManager = new UnreadFileManager();

    const { loading = false } = props;
    const classes = useStyles({ foldersMenuBottomHeight: props.foldersMenuBottomHeight });
    const theme = useTheme();


    const isMdSmOrXs = useMediaQuery(theme.breakpoints.down('md'));

    const DateRangeModalRef = useRef();
    const AllFolderSearchDateRangeModalRef = useRef();
    const RefreshFolderCallbackAllSubscription = gql`
    subscription RefreshFolderCallbackAll {
        refreshfoldercallbackall 
      
    }
  `;

    const { data: refreshFolderCallbackAllSubscriptionResult } = useSubscription(
        RefreshFolderCallbackAllSubscription
    );

    useEffect(() => {

        if (
            refreshFolderCallbackAllSubscriptionResult &&
            refreshFolderCallbackAllSubscriptionResult.refreshfoldercallbackall
        ) {
            try {

                if (props.filesListAndEditorSelectedFolderId) {
                    getFoldersFilesFromFolderId({
                        variables: {
                            folderId: props.filesListAndEditorSelectedFolderId
                        },
                    });
                }
            } catch (e) {

            }

        }
    }, [refreshFolderCallbackAllSubscriptionResult]);

    const RefreshFolderCallbackSubscription = gql`
    subscription RefreshFolderCallback {
        refreshfoldercallback {
            folderId
            newFileIds
            deletedFileIds
            notDeletedFileIds
      }
    }
  `;

    const { data: refreshFolderCallbackSubscriptionResult } = useSubscription(
        RefreshFolderCallbackSubscription
    );

    useEffect(() => {

        if (
            refreshFolderCallbackSubscriptionResult &&
            refreshFolderCallbackSubscriptionResult.refreshfoldercallback
        ) {

         

                if (refreshFolderCallbackSubscriptionResult.refreshfoldercallback.newFileIds
                    && refreshFolderCallbackSubscriptionResult.refreshfoldercallback.newFileIds.length > 0
                ) {

                    if (refreshFolderCallbackSubscriptionResult.refreshfoldercallback.folderId == props.filesListAndEditorSelectedFolderId) {
                   

                    getFoldersFilesFromFolderIdWithNotify({
                        variables: {
                            notify:true,
                            folderId: props.filesListAndEditorSelectedFolderId
                        },
                    });
                }
                
                    refreshFolderCallbackSubscriptionResult.refreshfoldercallback.newFileIds.map(fileId => {

                        unreadFileManager.addFileId(refreshFolderCallbackSubscriptionResult.refreshfoldercallback.folderId,{ id: fileId, deleted: false });
                        bindCountToMenu();
                    });
                
              

            }

            if (refreshFolderCallbackSubscriptionResult.refreshfoldercallback.deletedFileIds
                && refreshFolderCallbackSubscriptionResult.refreshfoldercallback.deletedFileIds.length > 0
            ) {

                if (refreshFolderCallbackSubscriptionResult.refreshfoldercallback.folderId == props.filesListAndEditorSelectedFolderId) {
             

                    getFoldersFilesFromFolderIdWithNotify({
                    variables: {
                        notify:false,
                        folderId: props.filesListAndEditorSelectedFolderId
                    },
                });
            }
                refreshFolderCallbackSubscriptionResult.refreshfoldercallback.deletedFileIds.map(fileId => {

                    unreadFileManager.updateFileDeleteStatus(refreshFolderCallbackSubscriptionResult.refreshfoldercallback.folderId,{ id: fileId, deleted: true });
                    bindCountToMenu();
                });
            
          

        }
        
        if (refreshFolderCallbackSubscriptionResult.refreshfoldercallback.notDeletedFileIds
            && refreshFolderCallbackSubscriptionResult.refreshfoldercallback.notDeletedFileIds.length > 0
        ) {

            if (refreshFolderCallbackSubscriptionResult.refreshfoldercallback.folderId == props.filesListAndEditorSelectedFolderId) {
         

                getFoldersFilesFromFolderIdWithNotify({
                variables: {
                    notify:false,
                    folderId: props.filesListAndEditorSelectedFolderId
                },
            });
        }
            refreshFolderCallbackSubscriptionResult.refreshfoldercallback.notDeletedFileIds.map(fileId => {

                unreadFileManager.updateFileDeleteStatus(refreshFolderCallbackSubscriptionResult.refreshfoldercallback.folderId,{ id: fileId, deleted: false });
                bindCountToMenu();
            });
        
      

    }
        }
    }, [refreshFolderCallbackSubscriptionResult]);

    const getFoldersFilesFromFolderIdWithNotifyQuery = gql`
    query GetFoldersFilesFromFolderIdWithNotify(
        $folderId: String!
        $notify:Boolean!
        ) {
        get_folders_files_from_folder_id_with_notify(
            folderId: $folderId
            notify: $notify
            ) {
            notify
            folderId
            files{
            id
            preview
            filename
            createdAt
            extension
            truncatedTranscriptionText
            folder{
                id
                path
                folder_name
            }
            moreInfo
            deleted
        }
      }
    }
  `;

    let [
        getFoldersFilesFromFolderIdWithNotify,
        {
            loading: getFoldersFilesFromFolderIdWithNotifyQueryLoading,
            error: getFoldersFilesFromFolderIdWithNotifyQueryError,
            data: getFoldersFilesFromFolderIdWithNotifyQueryResult,
        },
    ] = useLazyQuery(getFoldersFilesFromFolderIdWithNotifyQuery, {
        fetchPolicy: "network-only",
    });
    useEffect(() => {
        if (getFoldersFilesFromFolderIdWithNotifyQueryResult && getFoldersFilesFromFolderIdWithNotifyQueryResult.get_folders_files_from_folder_id_with_notify) {
            
            if (getFoldersFilesFromFolderIdWithNotifyQueryResult.get_folders_files_from_folder_id_with_notify.folderId == props.filesListAndEditorSelectedFolderId) {
                const unreadFileIds = unreadFileManager.getFileIdsByFolderId(getFoldersFilesFromFolderIdWithNotifyQueryResult.get_folders_files_from_folder_id_with_notify.folderId);
                var newUnreadFileIds = [];
                const updatedFiles = getFoldersFilesFromFolderIdWithNotifyQueryResult.get_folders_files_from_folder_id_with_notify.files.map(file => {
                    
                    const isNew =  unreadFileIds.find(unReadFile => unReadFile.id == file.id);

                    if (isNew) {
                        newUnreadFileIds.push({id: file.id,deleted:isNew.deleted});
                        return { ...file, new: true };
                    } else {

                        return { ...file, new: false };
                    }
                });
                unreadFileManager.updateFileIdsByFolderId(getFoldersFilesFromFolderIdWithNotifyQueryResult.get_folders_files_from_folder_id_with_notify.folderId,newUnreadFileIds);
                props.setFilesListAndEditorFileListItems(updatedFiles);

                if(getFoldersFilesFromFolderIdWithNotifyQueryResult.get_folders_files_from_folder_id_with_notify.notify){
                    var context = new AudioContext();
                    context.resume().then(() => {
                        const audio = new Audio(process.env.PUBLIC_URL + "/beep.mp3");
                        audio.load();
                        audio.play().catch((rejectReason) => {
                            alert(rejectReason);
                        });
                    });
                }
            }
        }
    }, [getFoldersFilesFromFolderIdWithNotifyQueryResult]);

    useEffect(()=>{
        bindCountToMenu();
       
    },[props.subscriptionConnected,props.filesListAndEditorFileListItems]);

    const bindCountToMenu = ()=>{
        props.foldersListMenu.map((menu)=>{
            const unreadFileIds = unreadFileManager.getFileIdsByFolderId(menu.id);
          menu.deletedCount =  unreadFileIds.filter(file => file.deleted ).length;
           menu.unDeletedCount =  unreadFileIds.filter(file => !file.deleted ).length;
        })
    
        props.setFoldersListMenu(_.cloneDeep(props.foldersListMenu));
    }

    const getFoldersFilesFromFolderIdQuery = gql`
    query GetFoldersFilesFromFolderId($folderId: String!) {
        get_folders_files_from_folder_id(folderId: $folderId) {
            folderId
            files{
            id
            preview
            filename
            createdAt
            extension
            truncatedTranscriptionText
            folder{
                id
                path
                folder_name
            }
            moreInfo
            deleted
        }
      }
    }
  `;

    let [
        getFoldersFilesFromFolderId,
        {
            loading: getFoldersFilesFromFolderIdQueryLoading,
            error: getFoldersFilesFromFolderIdQueryError,
            data: getFoldersFilesFromFolderIdQueryResult,
        },
    ] = useLazyQuery(getFoldersFilesFromFolderIdQuery, {
        fetchPolicy: "network-only",
    });

    useEffect(() => {
        if (getFoldersFilesFromFolderIdQueryResult && getFoldersFilesFromFolderIdQueryResult.get_folders_files_from_folder_id) {

            if (getFoldersFilesFromFolderIdQueryResult.get_folders_files_from_folder_id.folderId == props.filesListAndEditorSelectedFolderId) {

            
                const unreadFileIds = unreadFileManager.getFileIdsByFolderId(getFoldersFilesFromFolderIdQueryResult.get_folders_files_from_folder_id.folderId);
                var newUnreadFileIds = [];
                const updatedFiles = getFoldersFilesFromFolderIdQueryResult.get_folders_files_from_folder_id.files.map(file => {
                    
                    const isNew =  unreadFileIds.find(unReadFile => unReadFile.id == file.id);
                   
                  
                    if (isNew) {
                        newUnreadFileIds.push({id: file.id,deleted:isNew.deleted});
                        return { ...file, new: true };
                    } else {

                        return { ...file, new: false };
                    }
                });
                unreadFileManager.updateFileIdsByFolderId(getFoldersFilesFromFolderIdQueryResult.get_folders_files_from_folder_id.folderId,newUnreadFileIds);
                props.setFilesListAndEditorFileListItems(updatedFiles);
            }
        }
    }, [getFoldersFilesFromFolderIdQueryResult]);

    const getIdsForQuickSearchQuery = gql`
    query GetIdsForQuickSearch(
        $folderId: ID!
        $searchText: String!) {
        get_ids_for_quick_search(
            folderId: $folderId
            searchText:$searchText) {
            ids
            searchText
      }
    }
  `;

    let [
        getIdsForQuickSearch,
        {
            loading: getIdsForQuickSearchQueryLoading,
            error: getIdsForQuickSearchQueryError,
            data: getIdsForQuickSearchQueryResult,
        },
    ] = useLazyQuery(getIdsForQuickSearchQuery, {
        fetchPolicy: "network-only",
    });

    useEffect(() => {
        if (getIdsForQuickSearchQueryResult &&
            getIdsForQuickSearchQueryResult.get_ids_for_quick_search) {


            if (props.filesListAndEditorQuickSearchText == getIdsForQuickSearchQueryResult.get_ids_for_quick_search.searchText) {
                props.setFilesListAndEditorQuickSearchIds(getIdsForQuickSearchQueryResult.get_ids_for_quick_search.ids);

            }

        }
    }, [getIdsForQuickSearchQueryResult]);


    const getFoldersFilesFromFolderIdDbFilterQuery = gql`
    query GetFoldersFilesFromFolderIdDbFilter(
        $folderId: String!
        $searchText: String!
        $startDate: String!
        $endDate: String!) {
            get_folders_files_from_folder_id_db_filter(
                folderId:  $folderId
                searchText: $searchText
                startDate: $startDate
                endDate: $endDate) {
                    currentDateTime
                    folderId
                    searchText
                    startDate
                    endDate
                    files{
                        id
                        preview
                        filename
                        createdAt
                        extension
                        truncatedTranscriptionText
                        folder{
                            id
                            path
                            folder_name
                        }
                        moreInfo
                        deleted
                    
                    }
      }
    }
  `;

    let [
        getFoldersFilesFromFolderIdDbFilter,
        {
            loading: getFoldersFilesFromFolderIdDbFilterQueryLoading,
            error: getFoldersFilesFromFolderIdDbFilterQueryError,
            data: getFoldersFilesFromFolderIdDbFilterQueryResult,
        },
    ] = useLazyQuery(getFoldersFilesFromFolderIdDbFilterQuery, {
        fetchPolicy: "network-only",
    });

    useEffect(() => {

        if (getFoldersFilesFromFolderIdDbFilterQueryResult &&
            getFoldersFilesFromFolderIdDbFilterQueryResult.get_folders_files_from_folder_id_db_filter) {


            if (getFoldersFilesFromFolderIdDbFilterQueryResult.get_folders_files_from_folder_id_db_filter.folderId == props.filesListAndEditorSelectedFolderId &&
                getFoldersFilesFromFolderIdDbFilterQueryResult.get_folders_files_from_folder_id_db_filter.searchText == props.filesListAndEditorArchiveSearchText &&
                momenttz(getFoldersFilesFromFolderIdDbFilterQueryResult.get_folders_files_from_folder_id_db_filter.startDate).format('YYYY-MM-DD') == momenttz(props.filesListAndEditorArchiveDateFrom).format('YYYY-MM-DD') &&
                momenttz(getFoldersFilesFromFolderIdDbFilterQueryResult.get_folders_files_from_folder_id_db_filter.endDate).format('YYYY-MM-DD') == momenttz(props.filesListAndEditorArchiveDateTo).format('YYYY-MM-DD')) {

                props.setFilesListAndEditorArchiveFileListItems(getFoldersFilesFromFolderIdDbFilterQueryResult.get_folders_files_from_folder_id_db_filter.files);
            }

        }
    }, [getFoldersFilesFromFolderIdDbFilterQueryResult]);



    const getFoldersDbFilterQuery = gql`
    query GetFoldersDbFilter(
        $folderIds: [String]!
        $searchText: String!
        $startDate: String!
        $endDate: String!) {
            get_folders_db_filter(
                folderIds:  $folderIds
                searchText: $searchText
                startDate: $startDate
                endDate: $endDate) {
                    currentDateTime
                    folderId
                    searchText
                    startDate
                    endDate
                    files{
                        id
                        preview
                        filename
                        createdAt
                        extension
                        truncatedTranscriptionText
                        folder{
                            id
                            path
                            folder_name
                        }
                        moreInfo
                        deleted
                    
                    }
      }
    }
  `;

    let [
        getFoldersDbFilter,
        {
            loading: getFoldersDbFilterQueryLoading,
            error: getFoldersDbFilterQueryError,
            data: getFoldersDbFilterQueryResult,
        },
    ] = useLazyQuery(getFoldersDbFilterQuery, {
        fetchPolicy: "network-only",
    });

    useEffect(() => {

        if (getFoldersDbFilterQueryResult &&
            getFoldersDbFilterQueryResult.get_folders_db_filter) {


            if (
                getFoldersDbFilterQueryResult.get_folders_db_filter.searchText == props.filesListAndEditorAllFolderSearchSearchText &&
                momenttz(getFoldersDbFilterQueryResult.get_folders_db_filter.startDate).format('YYYY-MM-DD') == momenttz(props.filesListAndEditorAllFolderSearchDateFrom).format('YYYY-MM-DD') &&
                momenttz(getFoldersDbFilterQueryResult.get_folders_db_filter.endDate).format('YYYY-MM-DD') == momenttz(props.filesListAndEditorAllFolderSearchDateTo).format('YYYY-MM-DD')) {

                props.setFilesListAndEditorAllFolderSearchFileListItems(getFoldersDbFilterQueryResult.get_folders_db_filter.files);
            }

        }
    }, [getFoldersDbFilterQueryResult]);

    const extraSmallSize = 6;
    const smallSize = 4;
    const mediumSize = props.filesListAndEditorDrawerToggle && props.filesListAndEditorDrawerWidth > window.innerWidth - ((window.innerWidth / 3) + 120) ? 6 : 4;
    const largeSize = props.filesListAndEditorDrawerToggle && props.filesListAndEditorDrawerWidth > window.innerWidth - ((window.innerWidth / 3) + 120) ? 4 : 3;
    const extraLargeSize = props.filesListAndEditorDrawerToggle && props.filesListAndEditorDrawerWidth > (window.innerWidth - window.innerWidth - ((window.innerWidth / 3) + 120)) ? 3 : 2;

    useEffect(() => {

        props.setFilesListAndEditorSelectedFolderId(new resolvesettings().getUserStartupFolder(props.authUserSettingsJson));
    }, [])

    useEffect(() => {
        try {
            if (props.filesListAndEditorSelectedFolderId) {
                getFoldersFilesFromFolderId({
                    variables: {
                        folderId: props.filesListAndEditorSelectedFolderId
                    },
                });
            }
        } catch (e) {

        }
    }, [props.subscriptionConnected, props.filesListAndEditorSelectedFolderId])

    useEffect(() => {
        if (props.filesListAndEditorSelectedFolderId) {
            props.setFilesListAndEditorArchiveDateFrom(null);
            props.setFilesListAndEditorArchiveDateTo(null);
            props.setFilesListAndEditorArchiveSearchText(null);
            props.setFilesListAndEditorArchiveFileListItems(null);
            if (DateRangeModalRef.current)
                DateRangeModalRef.current.clearSearch();

            props.setFilesListAndEditorAllFolderSearchDateFrom(null);
            props.setFilesListAndEditorAllFolderSearchDateTo(null);
            props.setFilesListAndEditorAllFolderSearchSearchText(null);
            props.setFilesListAndEditorAllFolderSearchFileListItems(null);
            if (AllFolderSearchDateRangeModalRef.current)
                AllFolderSearchDateRangeModalRef.current.clearSearch();

        }
    }, [props.filesListAndEditorSelectedFolderId]);

    const isOnArchiveSearch = props.filesListAndEditorArchiveFileListItems &&
        props.filesListAndEditorArchiveDateFrom &&
        props.filesListAndEditorArchiveDateTo;


    const isOnAllFolderSearchSearch = props.filesListAndEditorAllFolderSearchFileListItems &&
        props.filesListAndEditorAllFolderSearchDateFrom &&
        props.filesListAndEditorAllFolderSearchDateTo;


    var filesToBind = null;
    if (isOnAllFolderSearchSearch) {
        filesToBind = props.filesListAndEditorAllFolderSearchFileListItems;
    }
    else if (isOnArchiveSearch) {
        filesToBind = props.filesListAndEditorArchiveFileListItems;
    } else {
        filesToBind = props.filesListAndEditorFileListItems;
    }
    let filelistItemWithDeletedFilter = (props.filesListAndEditorFileListShowDeletedItems ?
        filesToBind :
        _.filter(filesToBind, item => item.deleted != true));

    if (props.filesListAndEditorQuickSearchText && props.filesListAndEditorQuickSearchText.length > 0) {
        filelistItemWithDeletedFilter = _.filter(filelistItemWithDeletedFilter, (item) => {
            // Assuming item.id is the property containing the ID in each object.
            return props.filesListAndEditorQuickSearchIds.includes(item.id);
        });
    }
    let selectedFolderName = "";
    if (props.filesListAndEditorSelectedFolderId && props.allFoldersDetails.length > 0) {
        const selectedFolderNameFound = _.find(props.allFoldersDetails, folder => folder.id == props.filesListAndEditorSelectedFolderId);
        if (selectedFolderNameFound)
            selectedFolderName = selectedFolderNameFound.folder_name;
    }

    let highlightWord = null;

    if (isOnArchiveSearch) {
        if (props.filesListAndEditorArchiveSearchText != null
            && props.filesListAndEditorArchiveSearchText.length > 0) {
            highlightWord = props.filesListAndEditorArchiveSearchText;
        }
    } else if(isOnAllFolderSearchSearch) {
        if (props.filesListAndEditorAllFolderSearchSearchText != null
            && props.filesListAndEditorAllFolderSearchSearchText.length > 0) {
            highlightWord = props.filesListAndEditorAllFolderSearchSearchText;
        }
    }  else {

        if (props.filesListAndEditorQuickSearchText != null
            && props.filesListAndEditorQuickSearchText.length > 0) {
            highlightWord = props.filesListAndEditorQuickSearchText;
        }
    }
    return (
        <Container className={classes.filesListContainer} maxWidth={false} disableGutters={true}>
            {isMdSmOrXs &&
                <div style={{ display: "flex" }}>
                    {!isOnAllFolderSearchSearch && !isOnArchiveSearch && <SearchWithDelay containerStyle={{ flex: 1 }} className={classes.searchbar} isLoading={getIdsForQuickSearchQueryLoading} onFinalSearch={(text) => {
                        props.setFilesListAndEditorQuickSearchText(text);
                        if (text != "") {
                            getIdsForQuickSearch({
                                variables: {
                                    folderId: props.filesListAndEditorSelectedFolderId,
                                    searchText: text
                                },
                            })
                        }
                    }} />
                    }
                    {!isOnAllFolderSearchSearch && !isOnArchiveSearch && <DateRangeModal dateRangeCalendarButtonClassName={classes.dateRangeCalendarButton} dateRangeCalendarIconClassName={classes.dateRangeCalendarIcon} ref={DateRangeModalRef} title={"Archive Search"} onSearch={(startDate, endDate, searchText) => {
                        props.setFilesListAndEditorAllFolderSearchDateFrom(null);
                        props.setFilesListAndEditorAllFolderSearchDateTo(null);
                        props.setFilesListAndEditorAllFolderSearchSearchText(null);
                        props.setFilesListAndEditorAllFolderSearchFileListItems(null);
                        if (AllFolderSearchDateRangeModalRef.current)
                            AllFolderSearchDateRangeModalRef.current.clearSearch();

                        props.setFilesListAndEditorArchiveDateFrom(startDate);
                        props.setFilesListAndEditorArchiveDateTo(endDate);
                        props.setFilesListAndEditorArchiveSearchText(searchText);

                        props.setFilesListAndEditorQuickSearchText("");

                        getFoldersFilesFromFolderIdDbFilter({
                            variables: {
                                folderId: props.filesListAndEditorSelectedFolderId,
                                searchText: searchText,
                                startDate: momenttz(startDate),
                                endDate: momenttz(endDate)
                            }
                        });
                    }
                    } />
                    }
                    {
                        !isOnAllFolderSearchSearch && !isOnArchiveSearch && <AllFolderSearchDateRangeModal AllFolderSearchDateRangeCalendarButtonClassName={classes.allFolderSearchDateRangeCalendarButton} AllFolderSearchDateRangeCalendarIconClassName={classes.allFolderSearchDateRangeCalendarIcon}
                            ref={AllFolderSearchDateRangeModalRef}
                            title={"All Folders Search"}
                            onSearch={(startDate, endDate, searchText) => {
                                props.setFilesListAndEditorArchiveDateFrom(null);
                                props.setFilesListAndEditorArchiveDateTo(null);
                                props.setFilesListAndEditorArchiveSearchText(null);
                                props.setFilesListAndEditorArchiveFileListItems(null);
                                if (DateRangeModalRef.current)
                                    DateRangeModalRef.current.clearSearch();

                                props.setFilesListAndEditorAllFolderSearchDateFrom(startDate);
                                props.setFilesListAndEditorAllFolderSearchDateTo(endDate);
                                props.setFilesListAndEditorAllFolderSearchSearchText(searchText);

                                props.setFilesListAndEditorQuickSearchText("");
                                const folderIds = new resolvesettings().getUserAllowFoldersId(props.authUserSettingsJson);
                                getFoldersDbFilter({
                                    variables: {
                                        folderIds: folderIds,
                                        searchText: searchText,
                                        startDate: momenttz(startDate),
                                        endDate: momenttz(endDate)
                                    }
                                });
                            }
                            } />
                    }
                </div>
            }
            <Container disableGutters={true} maxWidth={false} className={classes.fileListTopActionBar}>
                {(isOnArchiveSearch || isOnAllFolderSearchSearch) &&
                    <Tooltip title={"Clear Search"}>
                        <IconButton onClick={() => {
                            props.setFilesListAndEditorArchiveDateFrom(null);
                            props.setFilesListAndEditorArchiveDateTo(null);
                            props.setFilesListAndEditorArchiveSearchText(null);
                            props.setFilesListAndEditorArchiveFileListItems(null);
                            if (DateRangeModalRef.current)
                                DateRangeModalRef.current.clearSearch();

                            props.setFilesListAndEditorAllFolderSearchDateFrom(null);
                            props.setFilesListAndEditorAllFolderSearchDateTo(null);
                            props.setFilesListAndEditorAllFolderSearchSearchText(null);
                            props.setFilesListAndEditorAllFolderSearchFileListItems(null);
                            if (AllFolderSearchDateRangeModalRef.current)
                                AllFolderSearchDateRangeModalRef.current.clearSearch();

                        }} className={classes.archiveBackButton}>
                            <ArrowBackIcon className={classes.archiveBackButtonIcon} />
                        </IconButton>
                    </Tooltip>
                }
                <FileListMenu />
                <Typography className={classes.selectedFoldernameTypography}>{isOnAllFolderSearchSearch ? "All Folder Search" : selectedFolderName}</Typography>

                {!isMdSmOrXs && !isOnArchiveSearch && !isOnAllFolderSearchSearch && <SearchWithDelay className={classes.searchbar} isLoading={getIdsForQuickSearchQueryLoading} onFinalSearch={(text) => {
                    props.setFilesListAndEditorQuickSearchText(text);
                    if (text != "") {
                        getIdsForQuickSearch({
                            variables: {
                                folderId: props.filesListAndEditorSelectedFolderId,
                                searchText: text
                            },
                        })
                    }
                }} />
                }
                {(!isMdSmOrXs || (isMdSmOrXs && isOnArchiveSearch) || (isMdSmOrXs && isOnAllFolderSearchSearch)) &&
                    <>
                        {!isOnAllFolderSearchSearch && <DateRangeModal dateRangeCalendarButtonClassName={classes.dateRangeCalendarButton} dateRangeCalendarIconClassName={classes.dateRangeCalendarIcon} ref={DateRangeModalRef} title={"Archive Search"} onSearch={(startDate, endDate, searchText) => {
                            props.setFilesListAndEditorAllFolderSearchDateFrom(null);
                            props.setFilesListAndEditorAllFolderSearchDateTo(null);
                            props.setFilesListAndEditorAllFolderSearchSearchText(null);
                            props.setFilesListAndEditorAllFolderSearchFileListItems(null);
                            if (AllFolderSearchDateRangeModalRef.current)
                                AllFolderSearchDateRangeModalRef.current.clearSearch();

                            props.setFilesListAndEditorArchiveDateFrom(startDate);
                            props.setFilesListAndEditorArchiveDateTo(endDate);
                            props.setFilesListAndEditorArchiveSearchText(searchText);

                            props.setFilesListAndEditorQuickSearchText("");

                            getFoldersFilesFromFolderIdDbFilter({
                                variables: {
                                    folderId: props.filesListAndEditorSelectedFolderId,
                                    searchText: searchText,
                                    startDate: momenttz(startDate),
                                    endDate: momenttz(endDate)
                                }
                            });
                        }
                        } />
                        }
                        {!isOnArchiveSearch &&
                            <AllFolderSearchDateRangeModal AllFolderSearchDateRangeCalendarButtonClassName={classes.allFolderSearchDateRangeCalendarButton} AllFolderSearchDateRangeCalendarIconClassName={classes.allFolderSearchDateRangeCalendarIcon}
                                ref={AllFolderSearchDateRangeModalRef}
                                title={"All Folders Search"}
                                onSearch={(startDate, endDate, searchText) => {
                                    props.setFilesListAndEditorArchiveDateFrom(null);
                                    props.setFilesListAndEditorArchiveDateTo(null);
                                    props.setFilesListAndEditorArchiveSearchText(null);
                                    props.setFilesListAndEditorArchiveFileListItems(null);
                                    if (DateRangeModalRef.current)
                                        DateRangeModalRef.current.clearSearch();

                                    props.setFilesListAndEditorAllFolderSearchDateFrom(startDate);
                                    props.setFilesListAndEditorAllFolderSearchDateTo(endDate);
                                    props.setFilesListAndEditorAllFolderSearchSearchText(searchText);

                                    props.setFilesListAndEditorQuickSearchText("");
                                    const folderIds = new resolvesettings().getUserAllowFoldersId(props.authUserSettingsJson);
                                    getFoldersDbFilter({
                                        variables: {
                                            folderIds: folderIds,
                                            searchText: searchText,
                                            startDate: momenttz(startDate),
                                            endDate: momenttz(endDate)
                                        }
                                    });
                                }
                                } />
                        }
                    </>
                }
                <Container disableGutters={true} className={classes.fileListTopActionBarFilesCount}>
                    <Typography className={classes.fileListTopActionBarFilesCountText}>{`${filelistItemWithDeletedFilter.length} Files Found`}</Typography>
                </Container>
            </Container>
            {isOnArchiveSearch &&
                <Container disableGutters={true} maxWidth={false} className={classes.archiveSearchDetailsContainer}>
                    <Typography className={classes.archiveSearchDetails}>On Archive Search: FROM {momenttz(props.filesListAndEditorArchiveDateFrom).format('MM/DD/YYYY')} TO {momenttz(props.filesListAndEditorArchiveDateTo).format('MM/DD/YYYY')} {props.filesListAndEditorArchiveSearchText && `Search Text: ${props.filesListAndEditorArchiveSearchText}`}</Typography>
                </Container>
            }
            {isOnAllFolderSearchSearch &&
                <Container disableGutters={true} maxWidth={false} className={classes.archiveSearchDetailsContainer}>
                    <Typography className={classes.archiveSearchDetails}>On All Folder Search: FROM {momenttz(props.filesListAndEditorAllFolderSearchDateFrom).format('MM/DD/YYYY')} TO {momenttz(props.filesListAndEditorAllFolderSearchDateTo).format('MM/DD/YYYY')} {props.filesListAndEditorAllFolderSearchSearchText && `Search Text: ${props.filesListAndEditorAllFolderSearchSearchText}`}</Typography>
                </Container>
            }
            {getFoldersFilesFromFolderIdQueryLoading || getFoldersFilesFromFolderIdDbFilterQueryLoading ?
                <Box display={"flex"} justifyContent={"center"} marginTop={10}><CircularProgress /></Box> :
                <Grid container spacing={1} columns={12} className={classes.fileListGrid}>
                    {
                        props.filesListAndEditorSelectedFolderId ?
                            (filelistItemWithDeletedFilter.length > 0 ? ((getFoldersFilesFromFolderIdQueryLoading ? Array.from(new Array(5)) : filelistItemWithDeletedFilter).map((item, index) => {
                                const resolveExtensionsObj = new resolveExtensions();
                                let moreInfo = "";

                                if (item) {

                                    moreInfo = item.moreInfo && item.moreInfo != "" ? JSON.parse(item.moreInfo) : "";

                                }
                                return <Grid key={index} item xs={extraSmallSize}
                                    sm={smallSize}
                                    md={mediumSize}
                                    lg={largeSize}
                                    xl={extraLargeSize}
                                >
                                    <Container onClick={() => {
                                        const clonedFilesList = _.cloneDeep(props.filesListAndEditorFileListItems);

                                        const selectedItem = clonedFilesList.find(cloneFileitem => cloneFileitem.id === item.id);
                                        if (selectedItem)
                                            selectedItem.new = false;

                                        unreadFileManager.deleteFileId(item.folder.id, item.id);

                                        props.setFilesListAndEditorSelectedFileItem(item);
                                        props.setFilesListAndEditorModalToggle(true);
                                        props.setFilesListAndEditorFileListItems(clonedFilesList);
                                    }} disableGutters={true}
                                        className={clsx(classes.videoListItemContainer, {
                                            [classes.videoListItemContainerNewHighlight]: item.new,
                                            [classes.fileSeletedItem]: (
                                                item &&
                                                props.filesListAndEditorSelectedFileItem &&
                                                props.filesListAndEditorSelectedFileItem.id === item.id
                                            ),
                                            [classes.fileIsDeleted]: (
                                                item &&
                                                item.deleted
                                            )
                                        })}>
                                        {item ? (
                                            <Container

                                                disableGutters={true}
                                                maxWidth={"lg"}
                                                className={classes.previewContainer}
                                                style={{
                                                    backgroundImage: `url(data:image/png;base64,${item.preview})`, width: "100%",

                                                }}
                                            >

                                                {resolveExtensionsObj.isAudioExtension(item.extension) && <AudioFileIcon className={classes.itemIcon} />}
                                                {resolveExtensionsObj.isVideoExtension(item.extension) && <VideocamIcon className={classes.itemIcon} />}
                                                {resolveExtensionsObj.isImageExtension(item.extension) && <PhotoIcon className={classes.itemIcon} />}
                                                {resolveExtensionsObj.isPdfExtension(item.extension) && <PictureAsPdfIcon className={classes.itemIcon} />}
                                                {resolveExtensionsObj.isOggExtension(item.extension) && moreInfo != "" && moreInfo.customType == 'audio' && <AudioFileIcon className={classes.itemIcon} />}
                                                {resolveExtensionsObj.isOggExtension(item.extension) && moreInfo != "" && moreInfo.customType == 'video' && <VideocamIcon className={classes.itemIcon} />}

                                            </Container>
                                        ) : (
                                            <Skeleton variant="rectangular" width={"100%"} height={118} />
                                        )}
                                        {item ? (
                                            <Box className={classes.videoListItemContentContainer}>
                                                <ConditionalHighlightedTextTypography text={item.filename} highlightWord={highlightWord} gutterBottom variant="body2" className={classes.videoListItemTitle}>
                                                </ConditionalHighlightedTextTypography>
                                                <Container disableGutters={true} className={classes.captionContainer}>
                                                    <Typography fontSize={15} style={{ marginTop: 2 }} display="block" variant="caption" color="text.secondary">
                                                        {item.folder.folder_name}
                                                    </Typography>
                                                    {resolveExtensionsObj.isPdfExtension(item.extension) && moreInfo != "" && <Typography display="block" variant="caption" color="text.secondary" className={classes.videoListItemMoreInfo}>{`${moreInfo.numPages}`} {(moreInfo.numPages > 1) ? "Pages" : "Page"}</Typography>}
                                                    {resolveExtensionsObj.isAudioExtension(item.extension) && moreInfo != "" && <Typography display="block" variant="caption" color="text.secondary" className={classes.videoListItemMoreInfo}>{`${resolveExtensionsObj.convertDurationToHMS(moreInfo.durationInSeconds)}`}</Typography>}
                                                    {resolveExtensionsObj.isVideoExtension(item.extension) && moreInfo != "" && <Typography display="block" variant="caption" color="text.secondary" className={classes.videoListItemMoreInfo}>{`${resolveExtensionsObj.convertDurationToHMS(moreInfo.durationInSeconds)}`}</Typography>}
                                                    {resolveExtensionsObj.isImageExtension(item.extension) && moreInfo != "" && <Typography display="block" variant="caption" color="text.secondary" className={classes.videoListItemMoreInfo}>{`${moreInfo.size.width}x${moreInfo.size.height}`}</Typography>}

                                                    {resolveExtensionsObj.isOggExtension(item.extension) && moreInfo != "" && moreInfo.customType == 'audio' && <Typography display="block" variant="caption" color="text.secondary" className={classes.videoListItemMoreInfo}>{`${resolveExtensionsObj.convertDurationToHMS(moreInfo.durationInSeconds)}`}</Typography>}
                                                    {resolveExtensionsObj.isOggExtension(item.extension) && moreInfo != "" && moreInfo.customType == 'video' && <Typography display="block" variant="caption" color="text.secondary" className={classes.videoListItemMoreInfo}>{`${resolveExtensionsObj.convertDurationToHMS(moreInfo.durationInSeconds)}`}</Typography>}

                                                </Container>
                                                <ConditionalHighlightedTextTypography text={item.truncatedTranscriptionText != "" ? item.truncatedTranscriptionText : "No transcription added yet"} highlightWord={highlightWord} noWrap={true} fontWeight={800} fontSize={15} color="text.secondary">
                                                    
                                                </ConditionalHighlightedTextTypography>
                                                {(isOnArchiveSearch || isOnAllFolderSearchSearch) && <Typography className={classes.videoItemArchiveDateTime}>{momenttz(item.createdAt).utcOffset(0).format('YYYY-MM-DD HH:mm:ss')}</Typography>}
                                            </Box>
                                        ) : (
                                            <Box className={classes.videoListItemSkeleton} >
                                                <Skeleton />
                                                <Skeleton width="60%" />
                                            </Box>
                                        )}
                                    </Container>
                                </Grid>
                            })) : <Typography variant='h6' className={classes.nofilesFoundText}>No files found.</Typography>
                            )
                            : <Typography variant='h6' className={classes.nofilesFoundText}>No folder is selected.</Typography>
                    }

                </Grid>
            }
            <ScrollToTopButton />
        </Container>
    );
}

const mapStateToProps = (state) => {
    return { ...state.AuthUserReducer, ...state.OtherReducer, ...state.FilesListAndEditorReducer };
};
export default connect(mapStateToProps, {
    setFilesListAndEditorModalToggle,
    setFilesListAndEditorSelectedFileItem,
    setFilesListAndEditorSelectedFolderId,
    setFilesListAndEditorFileListItems,
    setFilesListAndEditorFileListShowDeletedItems,
    setFilesListAndEditorQuickSearchText,
    setFilesListAndEditorQuickSearchIds,
    setFilesListAndEditorArchiveDateFrom,
    setFilesListAndEditorArchiveDateTo,
    setFilesListAndEditorArchiveSearchText,
    setFilesListAndEditorArchiveFileListItems,
    setFilesListAndEditorAllFolderSearchDateFrom,
    setFilesListAndEditorAllFolderSearchDateTo,
    setFilesListAndEditorAllFolderSearchSearchText,
    setFilesListAndEditorAllFolderSearchFileListItems,
    setFoldersListMenu
})(FilesList);