/**
*   Angular 12 CRUD interface models for main component.  
* 
*   Copyright (C) 2020-2025  Marc Bertens-Nguyen  <m.bertens@pe2mbs.nl>
*
*   This program is free software; you can redistribute it and/or
*   modify it under the terms of the GNU General Public License
*   as published by the Free Software Foundation; only version 2.
*
*   This program is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU General Public License for more details.
*
*   You should have received a copy of the GNU General Public License
*   along with this program; if not, see <https://www.gnu.org/licenses/>.
**/
export interface IMbsColumnButton
{
    fontIcon:       string; 
    fontSet:        string;
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
    fontIcon:       string; 
    fontSet:        string;
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
    column:         string;
    algorithm:      'asc' | 'desc';
};


export interface IMbsPagedRequest
{
    page:           number;
    pageSize:       number;
    cached:         boolean;
    sorted?:        IMbsSortInformation;
    filters?:       Array<IMbsFilterSettings>;
    suppress?:      Array<string>;
};


export interface IMbsPagesResponse<T>
{
    count:          number;
    records:        Array<T>;
};


export interface IMbsCrudStatus
{
    status:         boolean;
    message?:       string;
};


export interface IMbsSelectList
{
    id:             number;     // The record id (primary key)
    value:          string | number | Date;
};


export interface IMbsColumnOptions
{
    columns:        Array<IMbsColumn>;
    edit:           boolean;  
};


export interface IMbsRouteParameters
{
    id:             string;
    vslue:          any;
    mode:           'new' | 'edit' | 'view' | 'filter';
    caption?:       boolean;
};

export interface IMbsCrudRights
{
    create:         boolean;
    read:           boolean;
    write:          boolean;
    delete:         boolean;
};

export interface IMbsTableView
{
    columns?:       Array<IMbsColumn>;
    pagesize?:      number;
}

export interface IMbsComponentInfo
{
    rights:         IMbsCrudRights;
    table?:         IMbsTableView;
};

export const CMbsCrudDefaultRights: IMbsCrudRights = 
{
    create:         true,
    read:           true,
    write:          true,
    delete:         false,
}

export enum ECrudOption
{
    Create,
    Read,
    Update,
    Delete
};

export interface ICrudTableInfo
{
    rights:         IMbsCrudRights;
    primary_key:    string;
    secondary_key:  string;

};
