export const userSwagger = {
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
}

export const userSchemaSwagger = {
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
}