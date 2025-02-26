export interface IMbeHelpRequest
{
    title:  string;
    topic:  string;
};


export interface IHelpInfo
{
    uri:              string;
    sanitizeHtml:     boolean;
    // @ts-ignore
    markedExtension?: marked.MarkedOptions;
} 