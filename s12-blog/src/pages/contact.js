import ContactForm from '@/components/contact/ContactForm';
import Head from 'next/head';

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
