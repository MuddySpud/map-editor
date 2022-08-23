import ICacheFile from "../../interfaces/state/tree/ICacheFile";
import CacheFile from "../../state/tree/CacheFile";
import INodeBase from "../../interfaces/state/tree/INodeBase";
import { ActionType } from "../../interfaces/enums/ActionType";


const gFileCode = {

    cloneFiles: (files: Array<ICacheFile>): Array<ICacheFile> => {

        if (!files
            || files.length === 0) {

            return [];
        }

        const cacheFiles: Array<ICacheFile> = [];
        let cacheFile: ICacheFile | null;

        files.forEach((file: ICacheFile) => {

            cacheFile = gFileCode.cloneFile(file);

            if (cacheFile) {

                cacheFiles.push(cacheFile);
            }
        });

        return cacheFiles;
    },

    cloneFile: (file: ICacheFile): ICacheFile => {

        const cacheFile: ICacheFile = new CacheFile(
            file.id,
            file.fileID,
            file.fileName,
            ActionType.None
        );

        cacheFile.r = file.r;

        return cacheFile;
    },

    convertToCacheFiles: (files: Array<any>): Array<ICacheFile> => {

        if (!files
            || files.length === 0) {

            return [];
        }

        const cacheFiles: Array<ICacheFile> = [];
        let cacheFile: ICacheFile | null;

        files.forEach((file: any) => {

            cacheFile = gFileCode.convertToCacheFile(file);

            if (cacheFile) {

                cacheFiles.push(cacheFile);
            }
        });

        return cacheFiles;
    },

    convertToCacheFile: (file: any): ICacheFile | null => {

        if (!file) {

            return null;
        }

        const cacheFile: ICacheFile = new CacheFile(
            file.id,
            file.fileID,
            file.fileName,
            ActionType.None
        );

        cacheFile.r = file.r;

        return cacheFile;
    },

    addFileToNode: (
        node: INodeBase,
        id: string,
        fileName: string,
        fileID: string, 
        action: ActionType = ActionType.None): void => {

        // A file only needs to be added to this once
        // It is here so that the node loads the files that might be needed
        // in plugins as soon as possible
        // All files should be marked as removed before saving
        // then in the parent node and each option those that are still needed 
        // will have their actions changed to none.
        // Any newly added files are marked as attachFile
        
        let file: ICacheFile;

        for (let i = 0; i < node.files.length; i++) {

            file = node.files[i];

            if (file.fileID === fileID) {

                file.action = ActionType.AttachFile;

                return;
            }
        }

        file = new CacheFile(
            id,
            fileID,
            fileName,
            action
        );

        node.files.push(file);
    },

    markAllOptionFilesAsDetach: (node: INodeBase): void => {
        
        // All option files should be marked as detach before saving
        // then in the parent node and each option those that are still needed 
        // will have their actions changed to none.
        // Any newly added files are marked as attachFile

        node.nodes.forEach((option: INodeBase) => {

            option.files.forEach((file: ICacheFile) => {

                file.action = ActionType.DetachFile
            });
        });
    }
};

export default gFileCode;

