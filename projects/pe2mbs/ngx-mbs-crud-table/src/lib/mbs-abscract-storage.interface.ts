import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()
export abstract class MbsStorageInterface
{
    public abstract storeComponentInfo( component_name: string, data: any ): void;
    public abstract restoreComponentInfo( component_name: string, default_data: any ): Observable<any>;
} 
