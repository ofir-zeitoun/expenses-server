export const statsSwagger = {
    "/api/stats": {
        "get": {
            "tags": [
                "stats"
            ],
            "summary": "Get Overall Expense Statistics",
            "description": "Retrieves overall statistics about expense lists, expenses, and users.",
            "responses": {
                "200": {
                    "description": "OK",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "totalLists": {
                                        "type": "integer",
                                        "description": "Total number of expense lists"
                                    },
                                    "totalExpenses": {
                                        "type": "integer",
                                        "description": "Total number of expenses across all lists"
                                    },
                                    "totalPrice": {
                                        "type": "number",
                                        "description": "Total price of all expenses"
                                    },
                                    "totalUsers": {
                                        "type": "integer",
                                        "description": "Total number of unique users who created expense lists"
                                    }
                                }
                            }
                        }
                    }
                },
                "500": {
                    "description": "Internal Server Error",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "error": {
                                        "type": "string",
                                        "description": "Error message"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
}