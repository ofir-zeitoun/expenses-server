import { swaggerErrorNotFound } from "../../routes/middlewares/swagger/swagger.errors";

export const expensesSwagger = {
    "/api/expenses": {
        "get": {
            "summary": "Get All Expenses",
            "description": "Retrieves a list of all expenses.",
            "tags": [
                "expenses"
            ],
            "responses": {
                "200": {
                    "description": "OK",
                    "content": {
                        "application/json": {
                            "data": {
                                "type": "array",
                                "description": "Array of expense objects",
                                "items": {
                                    "$ref": "#/components/schemas/Expense"
                                }
                            }
                        }
                    }
                }
            }
        },
        "post": {
            "summary": "Create a New Expense",
            "description": "Creates a new expense.",
            "tags": [
                "expenses"
            ],
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/Expense"
                        }
                    }
                }
            },
            "responses": {
                "201": {
                    "description": "Created",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/Expense"
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
                }
            }
        }
    },
    "/api/expenses/{id}": {
        "get": {
            "summary": "Get Expense by ID",
            "description": "Retrieves an expense by its unique identifier.",
            "tags": [
                "expenses"
            ],
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "OK",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/Expense"
                            }
                        }
                    }
                },
                ...swaggerErrorNotFound,
            }
        },
        "put": {
            "summary": "Update Expense",
            "description": "Updates an existing expense.",
            "tags": [
                "expenses"
            ],
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/Expense"
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "OK",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/Expense"
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
                ...swaggerErrorNotFound,
            }
        },
        "delete": {
            "summary": "Delete Expense",
            "description": "Deletes an expense by its unique identifier.",
            "tags": [
                "expenses"
            ],
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "OK",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/Expense"
                            }
                        }
                    }
                },
                ...swaggerErrorNotFound,
            }
        }
    }
}
