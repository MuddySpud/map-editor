
export enum LensStage {
    None = "none",

    // Nodes
    NodeEdit = 'nodeEdit',
    NodeCreate = 'nodeCreate',
    HoleEdit = 'holeEdit',
    MarkSocket = 'mapSocket',
    ShowBranchesValidation = 'showBranchesValidation',

    // Search
    SearchInput = "searchInput",
    SearchResults = 'searchResults',

    // Trees
    CreateTree = 'createTree',
    TreeEdit = 'treeEdit',
    TreeClone = 'treeClone',

    // Bots
    CreateAlias = 'createBot',
    AliasEdit = 'aliasEdit',
    
    // Subtrees
    CreateSubtree = 'createSubtree',
    SubtreeEdit = 'subtreeEdit',

    // Hubs
    TreeHub = 'treeHub',
    SubtreeHub = 'subtreeHub',
    BotHub = 'botHub',

    // Subtree links
    SubtreeLinkCreate = 'subtreeLinkCreate',
    SubtreeAndLinkCreate = 'subtreeAndLinkCreate',
    SubtreeLinkSwap = 'subtreeLinkSwap',
    SubtreeSelect = 'subtreeSelect',
    Plugs = 'plugs',

    // Branch actions
    SelectBranchTaskTarget = 'selectBranchTaskTarget',
    EditMoveBranch = 'editMoveBranch',
    EditCloneBranch = 'editCloneBranch',
    SelectBranchTaskOption = 'selectBranchTaskOption',
    SelectStashAction = 'selectStashAction',
    ReviewBranchToSubtree = 'reviewBranchToSubtree',
    CreateSubtreeLowerBoundaries = 'createSubtreeLowerBoundaries',
    SelectBranchTaskLimit = 'selectBranchTaskLimit',

    // Settings
    SettingsEdit = 'settingsEdit',
    ViewSettingsEdit = 'viewSettingsEdit',

    // Trees extra
    TreeHistory = 'treeHistory',
    SubtreeShape = 'subtreeShape',
    SubtreeSpread = 'subtreeSpread',
    TreeTags = 'treeTags',

    // Alerts
    ShowNotifications = 'showNotifications'
}
