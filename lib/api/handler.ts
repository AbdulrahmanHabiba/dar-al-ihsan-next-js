import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "./error";


type ApiHandler = (req: NextRequest, ctx: { params: Promise<Record<string, string>> }) => Promise<unknown>;

export function handleApi(handler: ApiHandler){
    return async (req: NextRequest, ctx: { params: Promise<Record<string, string>> }) => {
        try{
            const data = await handler(req, ctx);
            return NextResponse.json({data})
        }
        catch(error: unknown){
            if(error instanceof ApiError){
                return NextResponse.json(
                    {error: error.message ,code: error.code},
                    {status: error.status}
                )
            }
            else{
                return NextResponse.json(
                    {error: "Internal server error"},
                    {status: 500}
                );
            }
        }
    };
}