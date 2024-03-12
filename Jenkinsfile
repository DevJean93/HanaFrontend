
pipeline {
    agent any
    tools {nodejs "node"}
    environment {
        DOCKER_IMAGE = 'vuejs_app'
    }
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
        stage('Docker Build') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:${BUILD_NUMBER}")
                    // Construye la imagen de Docker con una etiqueta usando el número de compilación
                }
            }
        }
         stage('Run') {
            steps {
                sh 'docker run -d -p 8000:8000 --name node-todo-app node-todo-app'
            }
        }
    }
}
