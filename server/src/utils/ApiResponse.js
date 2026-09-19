/**
 * Standard success payload: { statusCode, data, message, success }.
 * success is true when statusCode is below 400.
 */
class ApiResponse {
    constructor(statusCode, data, message = 'Success') {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

module.exports = ApiResponse;
