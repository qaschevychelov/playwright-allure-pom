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
        stage('Make report') {
            steps {
                publishHTML([
                            allowMissing: false,
                            alwaysLinkToLastBuild: true,
                            keepAll: true,
                            reportDir: 'playwright-report',
                            reportFiles: REPORT_FILES,
                            reportName: "aggregated",
                            reportTitles: REPORT_TITLES
                        ])
            }
        }
    }
}