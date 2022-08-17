pipeline {
    agent any
    stages {
        stage('TESTS') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.24.2'
                }
            }
            steps {
                sh 'npm install'
                sh 'npx playwright install-deps'
                sh 'npm run test'
            }
        }
    }
}