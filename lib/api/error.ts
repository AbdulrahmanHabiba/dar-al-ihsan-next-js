export class ApiError extends Error {
    status: number;
    code?: string;

    constructor(message: string, status: number = 500, code?: string){
        super();
        this.message = message;
        this.status = status;
        this.code = code;
    }
    static badRequest(message = "Invalid request"){
        return new ApiError(message,400,"BAD_REQUEST");
    }
    static notFound(message = "Resource not found"){
        return new ApiError(message,404,"NOT_FOUND");
    }
    static unauthorized(message = "Unauthorized"){
        return new ApiError(message,401,"UNAUTHORIZED");
    }
    static internal(message = "Internal server error"){
        return new ApiError(message,500,"INTERNAL_ERROR");
    }
}