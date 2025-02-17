

export interface IColumnButton
{
    icon:           string;
    action:         any;
    disabled?:      string; 
};


export interface IColumn
{
    field:          string;
    caption:        string;
    width:          string;
    active:         boolean;
    sort?:          boolean;
    filter?:        boolean; 
    fixed?:         boolean;
    index?:         number;
    buttons?:       Array<IColumnButton>;
    currentFilter?: IFilterSettings;
};


export interface IActionButton
{
    icon:           string;
    action:         any;
    disabled?:      string; 
};


export enum EFilterModes
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


export interface IFilterMode
{
    value:          EFilterModes;
    label:          string;
};


export interface IFilterSettings
{
    column:         string;
    mode:           EFilterModes;
    value:          string | number | Date;
};


export interface IFilterRequest
{
    element:        any;
    column:         IColumn;
    filterList?:    Array<string>;
};


export interface ISortInformation
{
    column:     string;
    algorithm:  'asc' | 'desc';
};


export interface IPagedRequest
{
    page:       number;
    pageSize:   number;
    cached:     boolean;
    sorted?:    ISortInformation;
    filters?:   Array<IFilterSettings>;
    suppress?:  Array<string>;
};


export interface IPagesResponse<T>
{
    count:      number;
    records:    Array<T>;
};


export interface ICrudStatus
{
    status:   boolean;
    message?: string;
};


export interface ISelectList
{
    id:       number;     // The record id (primary key)
    value:    string | number | Date;
};


export interface IGcColumnOptions
{
    columns:     Array<IColumn>;
    edit:        boolean;  
};


export interface IRouteParameters
{
    id:          string;
    vslue:       any;
    mode:        'new' | 'edit' | 'view' | 'filter';
    caption?:    boolean;
};

export interface ICrudRights
{
    create:   boolean;
    read:     boolean;
    write:    boolean;
    delete:   boolean;
};

export interface ITableView
{
    columns?:  Array<IColumn>;
    pagesize?: number;
}

export interface IComponentInfo
{
    rights:    ICrudRights;
    table?:    ITableView;
};

export const CCrudDefaultRights: ICrudRights = 
{
    create:   true,
    read:     true,
    write:    true,
    delete:   false,
}