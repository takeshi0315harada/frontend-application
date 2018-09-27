import { CognitoAuth } from 'amazon-cognito-auth-js'

const isDev = process.env.NODE_ENV === 'development'

export default class CognitoAuthSDK {
  constructor(identityProvider) {
    this.authData = {
      ClientId: process.env.CLIENT_ID,
      UserPoolId: process.env.USER_POOL_ID,
      AppWebDomain: process.env.APP_WEB_DOMAIN,
      TokenScopesArray: ['openid', 'email', 'profile', 'aws.cognito.signin.user.admin', 'phone'],
      RedirectUriSignIn: isDev
        ? 'http://localhost:3000/idpcb'
        : `https://${process.env.DOMAIN}/idpcb`,
      RedirectUriSignOut: isDev ? 'http://localhost:3000/' : `https://${process.env.DOMAIN}/`,
      IdentityProvider: identityProvider,
      AdvancedSecurityDataCollectionFlag: false
    }
    this.auth = new CognitoAuth(this.authData)
  }

  setTokens({ lastAuthUser, idToken, accessToken, refreshToken }) {
    const key = `CognitoIdentityServiceProvider.${process.env.CLIENT_ID}`
    const keyWithLastAuthUser = `${key}.${lastAuthUser}`
    localStorage.setItem(`${key}.LastAuthUser`, lastAuthUser)
    localStorage.setItem(`${keyWithLastAuthUser}.idToken`, idToken)
    localStorage.setItem(`${keyWithLastAuthUser}.accessToken`, accessToken)
    localStorage.setItem(`${keyWithLastAuthUser}.refreshToken`, refreshToken)
  }

  getOnSuccessResult() {
    return new Promise((resolve, reject) => {
      this.auth.userhandler = {
        onSuccess: (result) => {
          resolve(result)
        },
        onFailure: (err) => {
          reject(err)
        }
      }
    })
  }

  checkAuth(curUrl) {
    this.auth.parseCognitoWebResponse(curUrl)
  }

  logout() {
    this.auth.signOut()
  }
}
