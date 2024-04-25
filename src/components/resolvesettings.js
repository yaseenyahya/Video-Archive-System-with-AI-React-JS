export default class resolvesettings {
    getUserAllowEdit(settingsJson) {
        if(settingsJson && settingsJson.length > 0)
       return JSON.parse(settingsJson).allowEdit;
       else
       return true;
    }
    getUserAllowDownload(settingsJson) {
        if(settingsJson && settingsJson.length > 0)
        return JSON.parse(settingsJson).allowDownload;
        else
         return true;
    }
    getUserAllowFoldersId(settingsJson) {

        if(settingsJson && settingsJson.length > 0)
       return JSON.parse(settingsJson).allowFoldersId;
       else
       return [];
    }
    getUserStartupFolder(settingsJson) {
        if(settingsJson && settingsJson.length > 0)
        return JSON.parse(settingsJson).startupFolder;
        else
        return null;

    }
}