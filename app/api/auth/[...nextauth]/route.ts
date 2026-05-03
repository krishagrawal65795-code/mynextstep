import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
export const handler = NextAuth({
  providers: [ CredentialsProvider({ name: 'Credentials', credentials: { email: {}, password: {} }, async authorize(credentials) { const { data: user } = await supabase.from('users').select('*').eq('email', credentials.email).single(); if (user && await bcrypt.compare(credentials.password, user.password)) return { id: user.id, email: user.email, name: user.full_name, role: user.role }; return null; } }) ],
  session: { strategy: 'jwt' }, pages: { signIn: '/login' }, callbacks: { async jwt({ token, user }) { if (user) token.role = user.role; return token; }, async session({ session, token }) { session.user.role = token.role; return session; } }, secret: process.env.NEXTAUTH_SECRET
});
export { handler as GET, handler as POST };