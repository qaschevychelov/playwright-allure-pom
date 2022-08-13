pipeline {
  agent { 
    docker { 
      image 'mcr.microsoft.com/playwright:v1.24.2-focal'
      args '-v /var/jenkins_home:/var/jenkins_home -v /var/jenkins_workspaces:/var/jenkins_workspaces' 
    } 
  }
  stages {
    stage('install playwright') {
      steps {
        ws("/var/jenkins_workspaces/helloworld") {
          sh 'npm i -D @playwright/test'
          sh 'npx playwright install'
        }
      }
    }
    stage('test') {
      steps {
        ws("/var/jenkins_workspaces/helloworld") {
          sh 'npm run test'
        }
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