module.exports = {
  apps: [
    {
      name: "connectionline.ch",
      script: "server.js",
      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      out_file: "logs/out.log",
      log_file: "logs/combined.log",
      error_file: "logs/errors.log",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
