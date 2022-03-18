import React, { useMemo } from 'react'
import Link from 'next/link'
import { Button, Avatar } from 'antd'
import { PlusCircleOutlined, UserOutlined } from '@ant-design/icons'
import styles from './Navbar.module.css'
import { useConnection, useWallet, WalletProvider } from '@solana/wallet-adapter-react'
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
  WalletConnectButton
} from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
function Navbar() {
  const connection = useConnection();
  const wallet = useWallet();

  const network = WalletAdapterNetwork.Devnet;

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new SolletExtensionWalletAdapter({ network }),
    ],
    [network]
  );

  return (
    <header className={styles.container}>
      <div className={styles.right}>
        <Link href="/">
          <a>
            <h2>Clueconn</h2>
          </a>
        </Link>
      </div>
      <div className={styles.left}>
        <div className={styles.create}>
          <Link href="/new/title">
            <a>


              <Button type="primary" shape="round" icon={<PlusCircleOutlined />} size="large">
                Create
              </Button>
            </a>
          </Link>
        </div>
        <div>
          {wallet.connected ?
            <Avatar size={48} icon={<UserOutlined />} />
            :
            <>
              <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                  <WalletMultiButton />
                  {/* <WalletConnectButton /> */}
                </WalletModalProvider>
              </WalletProvider>
            </>
          }
        </div>
      </div>
    </header>
  )
}

export default Navbar
