import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "./error";


export function handleApi(handler: Function){
    return async (req: NextRequest, ctx: any) => {
        try{
            const data = await handler(req, ctx);
            return NextResponse.json({data})
        }
        catch(error: any){
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