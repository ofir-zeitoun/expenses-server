export const expensesListSwagger = {
    "/api/expenses-list": {
        "get": {
            "tags": [
                "expenses"
            ],
            "summary": "Get Expense Lists",
            "description": "Retrieves a paginated list of expense lists with basic information, creator details, and total expense prices.",
            "parameters": [
                {
                    "name": "offset",
                    "in": "query",
                    "description": "Starting index for pagination",
                    "schema": {
                        "type": "integer",
                        "format": "int32"
                    }
                },
                {
                    "name": "limit",
                    "in": "query",
                    "description": "Number of items to return per page",
                    "schema": {
                        "type": "integer",
                        "format": "int32"
                    }
                },
                {
                    "name": "sortOrder",
                    "in": "query",
                    "description": "Sort order (asc or desc)",
                    "schema": {
                        "type": "string",
                        "enum": [
                            "asc",
                            "desc"
                        ]
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "OK",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "offset": {
                                        "type": "integer",
                                        "description": "Starting index used in the response"
                                    },
                                    "limit": {
                                        "type": "integer",
                                        "description": "Number of items returned per page"
                                    },
                                    "sortOrder": {
                                        "type": "string",
                                        "description": "Sort order used in the response (asc or desc)"
                                    },
                                    "total": {
                                        "type": "integer",
                                        "description": "Total number of expense lists (before pagination)"
                                    },
                                    "data": {
                                        "type": "array",
                                        "description": "Array of expense list objects",
                                        "items": {
                                            "$ref": "#/components/schemas/ExpensesList"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Bad Request",
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

export const expensesListSchemaSwagger = {
    "ExpensesList": {
        "type": "object",
        "required": [
            "name",
            "creator",
            "expenses"
        ],
        "properties": {
            "id": {
                "type": "string",
                "description": "Unique identifier of the expense list"
            },
            "name": {
                "type": "string",
                "description": "Name of the expense list"
            },
            "creator": {
                "type": "object",
                "description": "User who created the expense list (limited details)",
                "properties": {
                    "id": {
                        "type": "string",
                        "description": "User ID"
                    },
                    "name": {
                        "type": "string",
                        "description": "User name"
                    },
                    "image": {
                        "type": "string",
                        "description": "User profile image URL (optional)"
                    }
                }
            },
            "expenses": {
                "type": "array",
                "description": "List of expenses associated with this list",
                "items": {
                    "$ref": "#/components/schemas/Expense"
                }
            },
            "totalExpenses": {
                "type": "number",
                "description": "Total price of all expenses in the list (calculated)"
            },
            "createdAt": {
                "type": "string",
                "format": "date-time",
                "description": "Timestamp of expense list creation"
            },
            "updatedAt": {
                "type": "string",
                "format": "date-time",
                "description": "Timestamp of expense list update"
            }
        }
    }
}