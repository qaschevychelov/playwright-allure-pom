pipeline {
  agent { 
    docker { 
      image 'mcr.microsoft.com/playwright:v1.24.2-focal'
      args '-v /var/jenkins_home:/var/jenkins_home' 
    } 
  }
  stages {
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