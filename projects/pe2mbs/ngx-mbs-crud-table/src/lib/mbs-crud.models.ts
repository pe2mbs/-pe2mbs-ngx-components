

export interface IMbsColumnButton
{
    icon:           string;
    action:         any;
    disabled?:      string; 
};


export interface IMbsColumn
{
    field:          string;
    caption:        string;
    width:          string;
    active:         boolean;
    sort?:          boolean;
    filter?:        boolean; 
    fixed?:         boolean;
    index?:         number;
    buttons?:       Array<IMbsColumnButton>;
    currentFilter?: IMbsFilterSettings;
};


export interface IMbsActionButton
{
    icon:           string;
    action:         any;
    disabled?:      string; 
};


export enum EMbsFilterModes
{
    Cleared = 0,
    Contains = 1,
    Equal,
    NoEqual,
    Startswith,
    Endswith,
    Empty,
    NotEmpty
};


export interface IMbsFilterMode
{
    value:          EMbsFilterModes;
    label:          string;
};


export interface IMbsFilterSettings
{
    column:         string;
    mode:           EMbsFilterModes;
    value:          string | number | Date;
};


export interface IMbsFilterRequest
{
    element:        any;
    column:         IMbsColumn;
    filterList?:    Array<string>;
};


export interface IMbsSortInformation
{
    column:     string;
    algorithm:  'asc' | 'desc';
};


export interface IMbsPagedRequest
{
    page:       number;
    pageSize:   number;
    cached:     boolean;
    sorted?:    IMbsSortInformation;
    filters?:   Array<IMbsFilterSettings>;
    suppress?:  Array<string>;
};


export interface IMbsPagesResponse<T>
{
    count:      number;
    records:    Array<T>;
};


export interface IMbsCrudStatus
{
    status:   boolean;
    message?: string;
};


export interface IMbsSelectList
{
    id:       number;     // The record id (primary key)
    value:    string | number | Date;
};


export interface IMbsColumnOptions
{
    columns:     Array<IMbsColumn>;
    edit:        boolean;  
};


export interface IMbsRouteParameters
{
    id:          string;
    vslue:       any;
    mode:        'new' | 'edit' | 'view' | 'filter';
    caption?:    boolean;
};

export interface IMbsCrudRights
{
    create:   boolean;
    read:     boolean;
    write:    boolean;
    delete:   boolean;
};

export interface IMbsTableView
{
    columns?:  Array<IMbsColumn>;
    pagesize?: number;
}

export interface IMbsComponentInfo
{
    rights:    IMbsCrudRights;
    table?:    IMbsTableView;
};

export const CMbsCrudDefaultRights: IMbsCrudRights = 
{
    create:   true,
    read:     true,
    write:    true,
    delete:   false,
}