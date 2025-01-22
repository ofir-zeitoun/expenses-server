import swaggerUi from "swagger-ui-express";
import { statsSwagger } from "../../../features/stats";
import {userSwagger,userSchemaSwagger} from "../../../features/users";
import { expenseSchemaSwagger, expensesSwagger } from "../../../features/expenses";
import { expensesListSchemaSwagger, expensesListSwagger } from "../../../features/expenses-list";
import { healthCheckSwagger } from "../../../features/health-check";
import { env } from "../../../utils";

export const swaggerOptions = {
    swaggerOptions: {
        oauth: {
            clientId: env.auth0ClientId,
            clientSecret: env.Auth0ClientSecret,
            additionalQueryStringParams: { audience: env.Auth0Audience }
        }
    }
};

export const swaggerDocument = {
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
        ...healthCheckSwagger,
        ...userSwagger,
        ...statsSwagger,
        ...expensesListSwagger,
        ...expensesSwagger,
    },
    "components": {
        "securitySchemes": {
            "auth0": {
                "type": "oauth2",
                "flows": {
                    "authorizationCode": {
                        "authorizationUrl": `https://${env.Auth0Domain}/authorize`,
                        "tokenUrl": `https://${env.Auth0Domain}/oauth/token`,
                        "scopes": {
                            "read:": "Read your data",
                            "write:": "Modify your  data"
                        }
                    }
                }
            }
        },
        "schemas": {
            ...userSchemaSwagger,
            ...expenseSchemaSwagger,
            ...expensesListSchemaSwagger
        }
    }
}

export const swagger =  ["/docs",swaggerUi.serve,swaggerUi.setup(swaggerDocument, swaggerOptions)] as const;