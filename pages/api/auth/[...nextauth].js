import { login } from "@src/API/api"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  pages: {
    signIn: '/login',
    signOut: '/'
  },

  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credential Signup',
      async authorize(credentials) {
        const { wallet, signRequest } = credentials
        try {
          const response = await login({ wallet, signRequest })
          if (response.status === 422 || response.status === 401) {
            throw new Error(response.message)
          }

          if (response.status === 200) {
            return { accessToken: response.data.accessToken, wallet }
          }
        } catch (error) {
          throw new Error(error.message)
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken.token
        token.expires = user.accessToken.expires
        token.wallet = user.wallet
      }
      return token
    },

    async session({ session, token }) {
      if (token) return token
      return null
    },

    async signIn(data) {
      return true
    },
  }

}

export default NextAuth(authOptions)
