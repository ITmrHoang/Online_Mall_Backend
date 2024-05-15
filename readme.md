# Ecommerce store BE

## genaration migration

prisma migrate dev -name < name >

    prisma migrate dev --name init

apply first init: prisma migrate resolve --applied 0_init

apply migration for new app:

    prisma generate

    prisma migrate dev

    prisma migrate deploy

reset prisma

    prisma migrate reset

## alias folder nodejs

    npm install module-alias

in file package.json confict path
    {
        "name": "your-project-name",
        "scripts": {
            "start": "node src/index.js",
            "startdev": "node index.js --watch"
        },
        "_moduleAliases": {
            "@": "./",
            "core": "./core",
            "controllers": "./controllers",
            "routers": "./routers" 
        },
    }

trong file endpoint 

require('module-alias/register');
