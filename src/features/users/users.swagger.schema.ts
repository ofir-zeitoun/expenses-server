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