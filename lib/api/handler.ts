import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "./error";


export function handleApi(handler: Function){
    return async (req: NextRequest, ctx: any) => {
        try {
            const data = await handler(req, ctx);
            
            // إذا كان المرتجع هو بالفعل Response (بيحتوي على كوكيز أو هيدرز مخصصة)
            if (data instanceof Response) {
                return data;
            }

            return NextResponse.json({ data });
        }
        catch(error: any){
            if(error instanceof ApiError){
                return NextResponse.json(
                    { error: { message: error.message, code: error.code } },
                    { status: error.status }
                )
            }
            else{
                return NextResponse.json(
                    { error: { message: "Internal server error", code: "INTERNAL_ERROR" } },
                    { status: 500 }
                );
            }
        }
    };
}