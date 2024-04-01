import Head from 'next/head';

import ContactForm from '@/components/contact/ContactForm';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Ted Blog | Contact</title>
        <meta name="description" content="Send me your feedback or messages!" />
      </Head>
      <ContactForm />
    </>
  );
}
