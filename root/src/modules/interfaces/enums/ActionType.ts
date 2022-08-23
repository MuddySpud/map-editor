
export enum ActionType {

    None = 'none',

    // trees
    GetTrees = 'getTrees',
    FilterTrees = 'filterTrees',

    // bots
    FilterBots = 'filterBots',
    CreateAlias = 'createAlias',
    UpdateAlias = 'updateAlias',
    DeleteAlias = 'deleteAlias',
    DeleteDraft = 'deleteDraft',
    GetAlias = 'getAlias',
    GetDraft = 'getDraft',
    ValidateAliasName = 'validateAliasName',

    // tree
    PublishTree = 'publishTree',
    ValidateTree = 'validateTree',
    CloneTree = 'cloneTree',
    DeleteTree = 'deleteTree',
    CreateTree = 'createTree',
    UpdateTree = 'updateTree',
    ImportTree = 'importTree',
    ExportTree = 'exportTree',
    ExportTreeForDG = 'exportTreeForNav',
    PublishTreeToDG = 'publishTreeToNav',
    GetTree = 'getTree',
    GetTreeProject = 'getTreeProject',
    GetTreeStats = 'getTreeStats',
    RefreshTreeStats = 'refreshTreeStats',
    GetTreeHistory = 'getTreeHistory',
    GetSubtreeShape = 'getSubtreeShape',
    GetSubtreeSpread = 'getSubtreeSpread',
    GetTreesWithTags = 'getTreesWithTags',
    GetTreeKin = 'getTreeKIn',
    ValidateTreeName = 'validateTreeName',

    // node
    CreateNode = 'createNode',
    UpdateNode = 'updateNode',
    CloneBranch = 'cloneBranch',
    DeleteNode = 'deleteNode',
    MoveBranch = 'moveBranch',
    MoveBranchToStash = 'moveBranchToStash',
    CloneBranchToStash = 'cloneBranchToStash',
    GetMoveBranches = 'getMoveBranches',
    GetNodeAlts = 'getNodeAlts',
    UpdateNodeAlts = 'updateNodeAlts',
    ConvertBranchToSubtree = 'convertBranchToSubtree',
    GetNode = 'getNode',
    GetOptions = 'getOptions',
    GetOptionsAndParent = 'getOptionsAndParent',
    RefreshNode = 'refreshNode',
    ValidateNodeKey = 'validateNodeKey',

    // branchView
    GetBranchViewFromStart = 'getBranchViewFromStart',
    GetBranchViewFromMid = 'getBranchViewFromMid',
    GetBranchViewFromEnd = 'getBranchViewFromEnd',

    // subtree
    PublishSubtree = 'publishSubtree',
    ValidateSubtree = 'validateSubtree',
    CreateSubtreeLink = 'createSubtreeLink',
    CreateSubtreeAndLink = 'createSubtreeAndLink',
    DeleteSubtreeLink = 'deleteSubtreeLink',
    UpdateSubtreeLink = 'updateSubtreeLink',
    CreatePlug = 'createPlug',
    DeletePlug = 'deletePlug',
    UpdatePlug = 'updatePlug',
    SubtreeFromNode = 'subtreeFromNode',
    CreateSubtree = 'createSubtree',
    CreateSubtreeAndMapToSocket = 'createSubtreeAndMapToSocket',
    CreateSocketAndMapHoleToIt = 'createSocketAndMapHoleToIt',
    MapHoleToSocket = 'mapHoleToSocket',
    MapLimitToSocket = 'mapLimitToSocket',
    EditHole = 'editHole',
    DeleteHoleSocketMapping = 'deleteHoleSocketMapping',
    UpdateSubtree = 'updateSubtree',
    GetSubtree = 'getSubtree',
    RefreshSubtree = 'refreshSubtree',
    GetSockets = 'getSockets',
    DeleteSubtree = 'deleteSubtree',
    DeleteStSocket = 'deleteStSocket',
    UpdateStSocket = 'updateStSocket',
    CreateStSocket = 'createStSocket',
    UpdateHole = 'updateHole',
    CreateHole = 'createHole',
    UpdateStRoot = 'updateStRoot',
    CreateStRoot = 'createStRoot',
    DeleteStRoot = 'deleteStRoot',

    //autoComplete
    AutoCompleteToken = 'autoCompleteToken',

    // bot
    GetBot = 'getBot',

    // userViews
    GetLiveView = 'getLiveView',
    CreateUserView = 'createUserView',
    UpdateUserView = 'updateUserView',
    DeleteUserView = 'deleteUserView',

    // userSettings
    UpdateUserSettings = 'updateUserSettings',
    ClearLiveUserView = 'clearLiveUserView',

    // notifications
    AddNotifications = 'addNotifications',
    GetAllNotifications = 'getAllNotifications',
    GetUserNotifications = 'getUserNotifications',
    GetTreeNotifications = 'getTreeNotifications',
    GetUserTreeNotifications = 'getUserTreeNotifications',
    GetLocalTreeNotifications = 'getLocalTreeNotifications',
    SaveHttpError = 'saveHttpError',

    // search
    Search = 'search',
    SearchTrees = 'searchTrees',
    SearchSubtrees = 'searchSubtrees',
    SearchNodes = 'searchNodes',

    // state
    RecordState = 'recordState',

    // subscriptions
    GetSubscriptions = 'getSubscriptions',

    // files
    CreateFile = 'createFile',
    CreateAndAttachFile = 'createAndAttachFile',
    UpdateFile = 'updateFile',
    DeleteFile = 'deleteFile',
    AttachFile = 'attachFile',
    DetachFile = 'detachFile',
    UploadOptionImage = 'uploadOptionImage'    
}

