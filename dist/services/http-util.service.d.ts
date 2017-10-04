import { HttpClient, HttpParams } from "@angular/common/http";
export declare class HttpUtilService {
    private http;
    ApiBaseAddress: string;
    constructor(http: HttpClient);
    BuidlUrl(...url: string[]): string;
    BuildGetParams(entity: any): HttpParams;
}
