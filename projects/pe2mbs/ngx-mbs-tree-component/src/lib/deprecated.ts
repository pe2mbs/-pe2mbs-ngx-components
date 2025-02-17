export function deprecated( methodName: string, alternative: string ) 
{
    console.warn(`${methodName} is deprecated. please use ${alternative} instead`);
}
