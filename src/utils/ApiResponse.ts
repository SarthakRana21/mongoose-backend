class ApiResponse {
    sucessCode: number;
    data: any;
    message: string;
    success: boolean;

    constructor(
        successCode: number,
        data: any,
        message = "Sucess"
    ) {
        this.sucessCode = successCode
        this.data = data
        this.message = message
        this.success = this.sucessCode < 400
    }
}

export {ApiResponse}