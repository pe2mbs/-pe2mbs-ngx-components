import { InjectionToken } from '@angular/core';

export const MBS_MONACO_EDITOR_CONFIG = new InjectionToken('MBS_MONACO_EDITOR_CONFIG');

export interface MbsMonacoEditorConfig {
    baseUrl?: string;
    requireConfig?: { [key: string]: any; };
    defaultOptions?: { [key: string]: any; };
    monacoRequire?: Function;
    onMonacoLoad?: Function;
}
