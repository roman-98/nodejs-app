pipeline {
    agent any
    stages{
        stage("checkout"){
            steps{
                checkout scm
            }
        }

        stage("test"){
            steps{
                sh 'sudo apt install -y npm'
                sh 'npm install mocha --save-dev'
                sh 'npm install supertest --save-dev'
                sh 'npm test'
            }
        }

        stage("build"){
            steps{
                sh 'npm run build'
            }
        }

        stage("build image"){
            steps{
                sh 'sudo docker build -t nodejs-app:1.0 .'
            }
        }
        stage('Deploy Docker Image') {
            steps {
                script {
                 withCredentials([string(credentialsId: 'dockerhub-pwd', variable: 'dockerhubpwd')]) {
                    sh 'docker login -u romanstripa -p ${dockerhubpwd}'
                 }  
                 sh 'docker push devopshint/nodejs-app:latest'
                }
            }
        }
    }
}