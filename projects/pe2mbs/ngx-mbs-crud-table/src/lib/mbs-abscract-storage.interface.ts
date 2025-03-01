/**
*   Angular 12 CRUD abstract storage class for main component.  
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
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()
export abstract class MbsStorageInterface
{
    public abstract storeComponentInfo( component_name: string, data: any ): void;
    public abstract restoreComponentInfo( component_name: string, default_data: any ): Observable<any>;
} 
