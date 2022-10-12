def gitBranch = env.BRANCH_NAME
def gitURL = "git@github.com:Memphisdev/memphis-cli.git"
def repoUrlPrefix = "memphisos"

node ("spot-agents") {
  git credentialsId: 'main-github', url: gitURL, branch: gitBranch
  
  try{
    
   stage('Push to NPM') {
      sh 'sudo npm install'
      withCredentials([string(credentialsId: 'npm_token', variable: 'npm_token')]) {
        sh "echo //registry.npmjs.org/:_authToken=$npm_token > .npmrc"
       sh 'npm publish'
      }
    }
    
    stage('NPM Install') {
      sh 'sudo npm install pkg -g'
      sh 'pkg package.json'
    }

    stage('Create tar') {
      sh 'mv release/memphis-dev-cli-macos release/mem'
      sh 'tar -czf mem.tar.gz release/mem'
      sh(script:"""sha256sum mem.tar.gz | awk '{print \$1}' > sha256""", returnStdout: true)
    }

    stage('Create new release') {
      sh 'sudo yum-config-manager --add-repo https://cli.github.com/packages/rpm/gh-cli.repo'
      sh 'sudo yum install gh -y'
      sh 'sudo yum install jq -y'
      sh(script:"""jq -r '"v" + .version' package.json > version.conf""", returnStdout: true)
      withCredentials([string(credentialsId: 'gh_token', variable: 'GH_TOKEN')]) {
        sh(script:"""gh release create \$(cat version.conf) ./mem.tar.gz --generate-notes -d""", returnStdout: true)
        //sh(script:"""gh release create 5.5.5 ./mem.tar.gz --generate-notes""", returnStdout: true)
      }
    }

    stage('Clone homebrew repo') {
      dir ('homebrew-memphis-cli'){
        git credentialsId: 'main-github', url: 'git@github.com:memphisdev/homebrew-memphis-cli.git', branch: 'master' 
      }
    }

    stage('Edit memphis.rb') {
      sh "aws s3 cp s3://memphis-jenkins-backup-bucket/build_files/memphis.rb ."
      sh(script:"""sed -i -r "s/v[0-9].[0-9].[0-9]/$(cat version.conf)/g" homebrew-memphis-cli/memphis.rb""", returnStdout: true)
      sh(script:"""sed  "s/sha256.*/sha256 \"$(cat sha256)\"/g" homebrew-memphis-cli/memphis.rb""", returnStdout: true)
    }

    stage('Push to homebrew-memphis-cli') {
      dir ('homebrew-memphis-cli'){
        withCredentials([sshUserPrivateKey(keyFileVariable:'check',credentialsId: 'main-github')]) {
	       sh 'git commit -m "Version update" -a'
	       sh "GIT_SSH_COMMAND='ssh -i $check'  git checkout -b Jenkins" //DELETE
         sh "GIT_SSH_COMMAND='ssh -i $check' git push --set-upstream origin Jenkins" //CHANGE TO MASTER
        }
  	  }
    }

    stage('Install BREW') {
      sh 'NONINTERACTIVE=1 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
    }

    stage('Push to BREW') {
        dir ('homebrew-memphis-cli'){
         // sh '/home/linuxbrew/.linuxbrew/bin/brew tap memphisdev/homebrew-memphis-cli'
         // sh '/home/linuxbrew/.linuxbrew/bin/brew install memphisdev/homebrew-memphis-cli/memphis'
        }
    }

    notifySuccessful()

  } catch (e) {
      currentBuild.result = "FAILED"
      cleanWs()
      notifyFailed()
      throw e
  }
}

def notifySuccessful() {
  emailext (
      subject: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
      body: """<p>SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
        <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>""",
      recipientProviders: [[$class: 'DevelopersRecipientProvider']]
    )
}

def notifyFailed() {
  emailext (
      subject: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
      body: """<p>FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
        <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>""",
      recipientProviders: [[$class: 'DevelopersRecipientProvider']]
    )
}
