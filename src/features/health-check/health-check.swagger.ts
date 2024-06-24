export const healthCheckSwagger = {
    "/health-check": {
        "get": {
            "tags": [
                "health check"
            ],
            "summary": "Health Check",
            "description": "Performs a basic health check to verify that the API is up and running.",
            "responses": {
                "200": {
                    "description": "OK",
                    "content": {
                        "application/json": {}
                    }
                }
            }
        }
    },
}

