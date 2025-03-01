/**
*   Angular 12 CRUD header directives for main component.  
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
import { Directive } from '@angular/core';

@Directive({
    selector: '[mbsCrudHeaderTitle],mbs-crud-header-title'
})
export class MbsCrudHeaderTitleDirective 
{
    constructor() 
    { 
        return;
    }
}

@Directive({
    selector: '[mbsCrudHeaderButton],mbs-crud-header-button'
})
export class MbsCrudHeaderButtonDirective 
{
    constructor() 
    { 
        return;
    }
}
