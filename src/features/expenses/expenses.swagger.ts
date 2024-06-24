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
}

export const expenseSchemaSwagger = {
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
}