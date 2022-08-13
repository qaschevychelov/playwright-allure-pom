pipeline {
  agent { 
    docker { 
      image 'mcr.microsoft.com/playwright:v1.24.0-focal'
    } 
  }
  stages {
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
      post {
        success {
          archiveArtifacts(artifacts: 'homepage-*.png', followSymlinks: false)
          sh 'rm -rf *.png'
        }
      }
    }
  }
}