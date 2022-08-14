pipeline {
  agent { 
    docker { 
      image 'mcr.microsoft.com/playwright:v1.24.2-focal'
    } 
  }
  stages {
    stage('install playwright') {
      steps {
        sh 'whoami'
        sh 'npm install'
        sh 'npm i -D @playwright/test'
        sh 'npx playwright install'
      }
    }
    stage('test') {
      steps {
        sh 'npm run test'
      }
    }
  }
}