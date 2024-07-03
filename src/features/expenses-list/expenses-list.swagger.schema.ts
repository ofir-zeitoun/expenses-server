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