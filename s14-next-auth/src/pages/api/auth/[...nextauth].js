import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import connectToDatabase from '@/lib/db';
import { verifyPassword } from '@/lib/auth';

export default NextAuth({
  providers: [
    CredentialsProvider({
      // NextAuth에서 제공하는 Login form을 사용하려면 아래 주석을 사용
      /* 
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      }, 
      */

      // custom login form을 사용하려면
      async authorize(credentials, req) {
        const client = await connectToDatabase();
        const usersCollection = client.db().collection('users');

        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        if (!user) {
          client.close();
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password,
        );
        if (!isValid) {
          client.close();
          throw new Error(
            'Could not log you in! Check your email or password again.',
          );
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
  callbacks: {
    async signIn(props) {
      // console.log(props);
      console.log('signIn called!!!! check out props');
      return true;
    },
  },
});
