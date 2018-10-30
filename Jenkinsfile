pipeline {
    agent {
        docker {
            image 'node:8-alpine'
            args '--link selenium_server'
        }
    }
    stages {
        stage('Run Tests') {
            steps {
                sh "npm install"
                sh "npm install webdriver-manager -g"
                sh "npm run wdup"
                sh "npm test"
            }
        }
    }
}