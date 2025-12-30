import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { sql } from '@vercel/postgres'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        try {
          // Get user from database
          const result = await sql`
            SELECT id, username, email, password_hash, name, role
            FROM admin_users
            WHERE username = ${credentials.username}
            AND active = true
          `

          if (result.rows.length === 0) {
            console.log('User not found')
            return null
          }

          const user = result.rows[0]

          // Verify password
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password_hash
          )

          if (!isValid) {
            console.log('Invalid password')
            return null
          }

          // Update last login
          await sql`
            UPDATE admin_users
            SET last_login = CURRENT_TIMESTAMP
            WHERE id = ${user.id}
          `

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }