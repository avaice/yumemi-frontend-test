/** @type {import('next').NextConfig} */

const SUB_DIRECTORY = "/population";

const isProd = process.env.NODE_ENV == "production"

module.exports = {
    basePath: isProd ? SUB_DIRECTORY : "",
}
