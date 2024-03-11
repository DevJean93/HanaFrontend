pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                sh 'npm install' // Instala las dependencias de Node.js
            }
        }
        stage('Test') {
            steps {
                sh 'npm test' // Ejecuta pruebas si las tienes
            }
        }
        stage('Docker Build') {
            steps {
                script {
                    docker.build('vuejs_app:latest') // Construye la imagen Docker
                }
            }
        }
    }
}
