import { swaggerErrorNotFound } from "../../routes/middlewares/swagger/swagger.errors";

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
                ...swaggerErrorNotFound,
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
                ...swaggerErrorNotFound,
            }
        }
    },
}
