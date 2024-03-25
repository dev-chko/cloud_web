//ecosystem.config.js
module.exports = {
  apps: {
    name: "grinbit.cloudpc",
    interpreter: "node",
    script: "./dist/main.js",
    instances: 0,
    exec_mode: "cluster",
    env_production: {},
  },

  deploy: {
    production: {
      user: "ubuntu",
      host: ["cloudpc1.grinbit.io", "cloudpc2.grinbit.io"],
      key: "~/.ssh/grinbit-deploy.key",
      ssh_options: "StrictHostKeyChecking=no",
      repo: "git@github.com:grinbit-korea/grinbit.cloudweb.git",
      ref: "origin/master",
      "post-setup":
        "yarn ; yarn build ; cp -r ./build ../../grinbit.cloud/current/dist ; rm ../../grinbit.cloud/current/dist/build/robots.txt",
      "post-deploy":
        "yarn ; yarn build ; cp -r ./build ../../grinbit.cloud/current/dist ; rm ../../grinbit.cloud/current/dist/build/robots.txt",
      path: "/home/ubuntu/grinbit.cloudweb",
    },
    staging: {
      user: "ofu",
      host: [{ host: "dev.grinbit.io", port: "243" }],
      key: "~/.ssh/grinbit-deploy.key",
      ssh_options: "StrictHostKeyChecking=no",
      repo: "git@github.com:grinbit-korea/grinbit.cloudweb.git",
      ref: "origin/develop",
      "post-setup":
        "yarn ; yarn build ; cp -r ./build ../../grinbit.cloud/current/dist",
      "post-deploy":
        "yarn ; yarn build ; cp -r ./build ../../grinbit.cloud/current/dist",
      path: "/home/ofu/grinbit.cloudweb",
    },
  },
};
