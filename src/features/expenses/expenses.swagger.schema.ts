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