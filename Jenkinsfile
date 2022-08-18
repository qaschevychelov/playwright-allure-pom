pipeline {
    agent any
    stages {
        stage('TESTS') {
            agent {
                docker {
                    image 'pw_custom'
                    args "-v /var/jenkins_home/:/var/jenkins_home/"
                    // image 'mcr.microsoft.com/playwright:v1.24.2-focal'
                }
            }
            steps {
                script {
                    try {
                        sh 'npm install'
                        sh 'npx playwright install-deps'
                        sh 'npm run test'
                    }catch(e) {}
                }
            }
        }
        stage('Make report') {
            steps {
                publishHTML([
                    allowMissing: false, 
                    alwaysLinkToLastBuild: false, 
                    keepAll: false, 
                    reportDir: 
                    'playwright-report', 
                    reportFiles: 'index.html', 
                    reportName: 'Отчет', 
                    reportTitles: ''
                ])
            }
        }
    }
}