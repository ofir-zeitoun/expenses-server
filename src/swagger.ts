export const options = {
    "openapi": "3.0.3",
    "info": {
        "title": "Expenses API Docs",
        "description": "Swagger for Expenses API",
        "version": "1.0.0"
    },
    "externalDocs": {
        "description": "Server Github",
        "url": "https://github.com/ofir-zeitoun/expenses-server"
    },
    "servers": [
        {
            "url": "http://localhost:1337"
        }
    ],
    "tags": [
        {
            "name": "health check",
            "description": "Server health check"
        },
        {
            "name": "user",
            "description": "Operations about user"
        },
        {
            "name": "stats",
            "description": "Operations about expense statistics"
        },
        {
            "name": "expenses",
            "description": "Operations about expense statistics"
        }
    ],
    "security": [
        {
            "auth0": [
                "read",
                "write"
            ]
        }
    ],
    "paths": {
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
        "/api/users": {
            "get": {
                "tags": [
                    "user"
                ],
                "summary": "Get all users",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/User"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "user"
                ],
                "summary": "Create a new user",
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/User"
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
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/users/{id}": {
            "put": {
                "tags": [
                    "user"
                ],
                "summary": "Update a user by ID",
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
                                "$ref": "#/components/schemas/User"
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
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Not Found"
                    }
                }
            },
            "delete": {
                "tags": [
                    "user"
                ],
                "summary": "Delete a user by ID",
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
                                    "type": "object"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Not Found"
                    }
                }
            }
        },
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
                            "application/json": {}
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
                    "404": {
                        "description": "Not Found",
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
                    "404": {
                        "description": "Not Found",
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
                    "404": {
                        "description": "Not Found",
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
        }
    },
    "components": {
        "securitySchemes": {
            "auth0": {
                "type": "oauth2",
                "flows": {
                    "authorizationCode": {
                        "authorizationUrl": `https://${process.env.AUTH0_DOMAIN}/authorize`,
                        "tokenUrl": `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
                        "scopes": {
                            "read:": "Read your data",
                            "write:": "Modify your  data"
                        }
                    }
                }
            }
        },
        "schemas": {
            "User": {
                "type": "object",
                "required": [
                    "name"
                ],
                "properties": {
                    "name": {
                        "type": "string",
                        "description": "User's name"
                    },
                    "phone": {
                        "type": "string",
                        "description": "User's phone number (optional)"
                    },
                    "photo": {
                        "type": "string",
                        "description": "URL of the user's photo (optional)"
                    },
                    "password": {
                        "type": "string",
                        "description": "User's password (optional)",
                        "writeOnly": true
                    },
                    "createdAt": {
                        "type": "string",
                        "format": "date-time",
                        "description": "Timestamp of user creation (read-only)"
                    },
                    "updatedAt": {
                        "type": "string",
                        "format": "date-time",
                        "description": "Timestamp of user update (read-only)"
                    }
                }
            },
            "Expense": {
                "type": "object",
                "required": [
                    "name",
                    "price",
                    "creator"
                ],
                "properties": {
                    "id": {
                        "type": "string",
                        "description": "Unique identifier of the expense"
                    },
                    "name": {
                        "type": "string",
                        "description": "Name of the expense"
                    },
                    "price": {
                        "type": "number",
                        "description": "Price of the expense"
                    },
                    "category": {
                        "type": "string",
                        "description": "Expense category (optional)"
                    },
                    "date": {
                        "type": "string",
                        "format": "date",
                        "description": "Date of the expense (optional)"
                    },
                    "creator": {
                        "type": "object",
                        "description": "User who created the expense (limited details)",
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
                    "createdAt": {
                        "type": "string",
                        "format": "date-time",
                        "description": "Timestamp of expense creation"
                    },
                    "updatedAt": {
                        "type": "string",
                        "format": "date-time",
                        "description": "Timestamp of expense update"
                    }
                }
            },
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
    }
}