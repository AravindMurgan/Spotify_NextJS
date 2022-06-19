import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import { LOGIN_URL } from "../../../../spotify"

const refereshAccessToken = async () => {
    try {

    } catch (error) {
        console.log(error);

        return {
            ...token,
            error: 'refereshAccessTokenError'
        }
    }
}

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            authorization: LOGIN_URL
        }),
        // ...add more providers here
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({ token, account, user }) {
            //in initial sign in
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refereshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: account.expires_at * 1000
                    //we handle everything in milliseconds hence *1000

                }
            }

            //return the token if its still valid
            if (Date.now() < token.accessTokenExpires) {
                return token;
            }

            //access token expired , call this special function
            //referesh the token
            return await refereshAccessToken(token)

        }
    }

})