import Head from 'next/head'

export default function Header({ title, description }) {
    return (
        <Head>
            <title>{`DAO-Realtor - ${title}`}</title>
            <meta name="description" content={`web3con - DAO Realtor ${description}`} />
            <link rel="icon" href="/favicon.ico" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
    )
}