import Head from 'next/head'
import Link from "next/link";
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import TestUI from './testui'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>LBU Student Portal</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Welcome: <br/>
            Get started by creating an account&nbsp;
            <code className={styles.code}><Link href="/register" className="p-2 font-bold font-sans border-b-2 border-double 
            border-transparent hover:border-none cursor-pointer select-none">
                    
                    Register
                    
                </Link></code>
          </p>
          <div>
          
          </div>
        </div>
      </main>
    </>
  )
}
