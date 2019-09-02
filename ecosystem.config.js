module.exports = {
  apps: [{
    name: 'MVP1',
    script: './server.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-54-205-106-92.compute-1.amazonaws.com',
       key: '~/.ssh/stellaPreMVP.pem',
      ref: 'origin/master',
      repo: 'https://github.com/eilufoye/mvp-1.git',
      path: '/home/ubuntu/mvp-1',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}

 