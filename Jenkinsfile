pipeline {
    agent any
    tools {nodejs "node"}
      environment {
    HOME = "${env.WORKSPACE}"
  }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
         stage('Initialize'){
        def dockerHome = tool 'docker'
        env.PATH = "${dockerHome}/bin:${env.PATH}"
            }
        stage('Build') {
            steps {
                sh 'npm install' // Instala las dependencias de Node.js
                echo 'Building the ToDo application on Docker'
                sh 'docker build . -t todo-app'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying the application on Docker'
                sh 'docker run -p 8083:80 -d todo-app'
            }
        }
    }
}
