class UnreadFileManager {
    constructor() {
      this.unreadFileIds = window.unreadFileIds || {};
    }
  
    saveToGlobalVariable() {
      window.unreadFileIds = this.unreadFileIds;
    }
  
    updateFileIdsByFolderId(folderId, fileIdsWithDeleteStatus) {
      this.unreadFileIds[folderId] = fileIdsWithDeleteStatus;
      this.saveToGlobalVariable();
    }
  
    addFileId(folderId, fileIdWithDeleteStatus) {
      if (!this.unreadFileIds[folderId]) {
        this.unreadFileIds[folderId] = [];
      }
      const existingFile = this.unreadFileIds[folderId].find(file => file.id === fileIdWithDeleteStatus.id);
      if (!existingFile) {
        this.unreadFileIds[folderId].push(fileIdWithDeleteStatus);
        this.saveToGlobalVariable();
      }
    }
    deleteFolderId(folderId) {
      if (this.unreadFileIds[folderId]) {
        delete this.unreadFileIds[folderId];
        this.saveToGlobalVariable(); 
      }
    }
    updateFileDeleteStatus(folderId, fileIdWithDeleteStatus) {
      if (!this.unreadFileIds[folderId]) {
        this.unreadFileIds[folderId] = [];
      }
      const existingFileIndex = this.unreadFileIds[folderId].findIndex(file => file.id === fileIdWithDeleteStatus.id);
      if (existingFileIndex !== -1) {
        // If the file already exists, update its deleted status
        this.unreadFileIds[folderId][existingFileIndex].deleted = fileIdWithDeleteStatus.deleted;
      } 
      this.saveToGlobalVariable();
    }
    deleteFileId(folderId, fileId) {
      if (this.unreadFileIds[folderId]) {
        const index = this.unreadFileIds[folderId].findIndex(file => file.id == fileId);
        
        if (index !== -1) {
          this.unreadFileIds[folderId].splice(index, 1);
          this.saveToGlobalVariable(); 
        }
      }
    }
  
    getFileIdsByFolderId(folderId) {
      return this.unreadFileIds[folderId] || [];
    }
  
    clearGlobalVariable() {
      this.unreadFileIds = {}; 
      window.unreadFileIds = undefined; 
    }
  }
  
  export default UnreadFileManager;
  