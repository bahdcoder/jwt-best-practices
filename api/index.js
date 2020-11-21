const { auth } = require('@tensei/auth')
const { tensei } = require('@tensei/core')
const { graphql } = require('@tensei/graphql')

tensei()
    .plugins([
        auth()
            .user('Customer')
            .plugin(),
        graphql()
            .middlewareOptions({
                cors: {
                    credentials: true,
                    origin: ['http://localhost:3000']
                }
            })
            .plugin()
    ])
    .databaseConfig({
        type: 'sqlite',
        dbName: 'tensei.sqlite',
    })
    .start()
    .catch(console.log)
