pipeline {
    agent any
    stages {
        stage('TESTS') {
            agent {
                docker {
                    image 'pw_custom'
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