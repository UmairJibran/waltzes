module.exports = {
  apps: [
    {
      name: 'flask-server',
      script: './venv/bin/flask',
      interpreter: './venv/bin/python',
      args: 'run',
      cwd: '.',
      autorestart: true,
      watch: false,
      env: {
        FLASK_APP: 'app.py',
        FLASK_ENV: 'development',
        PATH: './venv/bin:$PATH',
      },
    },
  ],
};
