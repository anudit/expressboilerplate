module.exports = {
    apps : [{
      name: "project",
      script: "./index.js",
      instances: "max",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }]
  }
