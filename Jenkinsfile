pipeline {
  stages {
    agent { 
      docker { 
        image 'mcr.microsoft.com/playwright:v1.24.2-focal'
      } 
    }
    stage('install playwright') {
      steps {
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