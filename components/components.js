import React, { Component, useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { fetchAPI } from '../lib/api'
import { Share } from 'react-twitter-widgets'

export class Header extends Component {
    render() {
    return <Head>
    <title>WordPress Core Contributor NFT</title>
    <link rel="icon" href="/core-contributor-nft/images/white-trans.png" />
  
    <meta property="og:title" content="WordPress Core Contributor NFT" key="ogtitle" />
    <meta property="og:description" content="Incentivizing WordPress contributions via Web3 technologies." key="ogdesc" />
    <meta property="og:type" content="website" key="ogtype" />
    <meta property="og:url" content="https://web3wp.com/" key="ogurl"/>
    <meta property="og:image" content="https://web3wp.infiniteuploads.cloud/2021/09/Web3_WP.png" key="ogimage"/>
    <meta property="og:site_name" content="Web3 WP" key="ogsitename" />
  
    <meta name="twitter:card" content="summary_large_image" key="twcard"/>
    <meta property="twitter:domain" content="web3wp.com" key="twdomain" />
    <meta property="twitter:url" content="https://web3wp.com/" key="twurl" />
    <meta name="twitter:title" content="WordPress Core Contributor NFT" key="twtitle" />
    <meta name="twitter:description" content="Incentivizing WordPress contributions via Web3 technologies." key="twdesc" />
    <meta name="twitter:image" content="https://web3wp.infiniteuploads.cloud/2021/09/Web3_WP.png" key="twimage" />
  </Head>
    }
  }

export class Navigation extends Component {
  render() {
    return <div className="flex items-center justify-between w-full px-6 pb-4">
    <a href="https://web3wp.com/" className="" title="Web3 WP Home"><img src="/core-contributor-nft/images/white-trans.png" width="75" alt="Web3 WP Logo" className="logo-image" /></a>
    <nav className="flex flex-wrap flex-row justify-around montserrat text-xl md:text-2xl text-white hover:text-gray">
      <Link href="/">
        <a className="m-1 sm:m-3 md:m-6">Browse</a>
      </Link>
      <Link href="/mint">
        <a className="m-1 sm:m-3 md:m-6">Mint</a>
      </Link>
      <Link href="/marketplace">
        <a className="m-1 sm:m-3 md:m-6">Marketplace</a>
      </Link>
      <a href="https://web3wp.com/" className="m-1 sm:m-3 md:m-6">About</a>
    </nav>
  </div>
  }
}

export function ContributorTitle(props) {
  if (props.props.title) { 
    return (
      <>
      {props.props.title}
      </>
    )
  } else {
    if ('noteworthy' == props.props.type) { 
      return (
        <>
        Noteworthy Contributor
        </>
      )
    } else {
      return (
        <>
        Core Contributor
        </>
      )
    }
  }
}

export function Browse() {

  const [wpVersions, setVersions] = useState(false)
  const [wpVersion, setVersion] = useState(null)
  const [userVersions, setUser] = useState(null)

  // UI
  const [apiError, setError] = useState(null)

  useEffect( async() => { 
    loadVersions()
  }, [])
  
  async function loadVersions() {

      setError(null)

      fetchAPI("versions", 'GET')
      .catch(function (error) {
        setError(error.message)
      })
      .then(function (data) {
        if (data) {
          setVersions(data)
        } else {
          setError("Sorry, there was an API error.")
        }
      });
    
  }

  async function loadVersion(version) {

    setError(null)

    fetchAPI("versions/"+version, 'GET')
    .catch(function (error) {
      setError(error.message)
    })
    .then(function (data) {
      if (data) {
        setVersion(data)
      } else {
        setError("Sorry, there was an API error.")
      }
    });
  }

  async function loadUser(username) {

    setError(null)

    fetchAPI("users/"+username, 'GET')
    .catch(function (error) {
      setError(error.message)
    })
    .then(function (data) {
      if (data) {
        setUser(data)
      } else {
        setError("Sorry, there was an API error.")
      }
    });
  }

  if (!wpVersions) { 
    return (
      <>
      {apiError ? 
          <div className="flex auth my-8 font-bold justify-center items-center vw2">
            <span className="rounded montserrat inline-block border-2 border-red-500 bg-red-200 border-opacity-100 no-underline text-red-600 py-2 px-4 mx-4">{apiError}</span>
          </div>
          :''}
      <div className="flex flex-col items-center">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-white"></div>
          </div>
          <div className="text-center text-4xl montserrat text-white bg-grey-lighter my-4 ml-3">
              Fetching WordPress contributors...
          </div>
      </div> 
      </>
    )
  }

  if (wpVersions && wpVersions.length) { 

    if ( userVersions !== null ) {
      return (
        <div className="flex flex-col items-center">
            <div className="text-center text-4xl montserrat text-white bg-grey-lighter my-4">
              Core Contributions for {userVersions.meta.name}
            </div>
            <div className="text-center text-2xl montserrat text-white bg-grey-lighter my-2 ml-3">
              {userVersions.meta.total} Contributions - {userVersions.meta.minted} NFTs Minted - <small><a href={"https://profiles.wordpress.org/"+userVersions.meta.username+"/"} target="_blank">WordPress Profile</a></small>

              <div className="p-1 text-center">
                <button onClick={() => setUser(null)} className="montserrat rounded text-xl border-6 bg-blau text-white hover:text-gray p-1 px-3 mb-1">Back</button>                
              </div>
            </div>
            <div className="flex justify-center">
              <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-4">
                  {
                    userVersions.contributions.map((wp, i) => (
                      <div key={wp.token_id} className="overflow-hidden shadow bg-white text-black text-justify rounded-lg">
                        <div className="relative overflow-hidden">
                          <img src="/core-contributor-nft/images/Wordpress-Logo.svg" className="p-2 rounded-t-lg w-full bg-white opacity-25" alt="WordPress Logo" />
                          <div className="p-1 text-center absolute pt-16 top-0 w-full">
                            <p className="text-2xl font-bold montserrat text-black">WordPress {wp.wp_version}</p>
                            <p className="text-xl font-bold montserrat text-gray-700 italic">{wp.musician}</p>
                            <p className="text-lg font-bold montserrat text-black">{wp.release_date}</p>
                          </div>
                          <div className="p-1 text-center absolute bottom-5 w-full">
                            <p className="text-xl font-bold montserrat text-black"><ContributorTitle props={wp} /></p>
                          </div>
                        </div>
                        <div className="p-1 text-center">
                          <button onClick={() => alert('Coming soon!')} className="montserrat rounded text-xl border-6 bg-blau text-white hover:text-gray p-1 px-3 mb-1">Mint NFT</button>                
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
        </div> 
      )
    
    } else if ( wpVersion !== null ) {
      return (
        <div className="flex flex-col items-center">
            <div className="text-center text-4xl montserrat text-white bg-grey-lighter my-4">
            WordPress {wpVersion.meta.wp_version} "{wpVersion.meta.musician}" <small>({wpVersion.meta.release_date})</small>
            </div>
            <div className="text-center text-2xl montserrat text-white bg-grey-lighter my-2 ml-3">
            {wpVersion.meta.total} Contributors - {(wpVersion.meta.minted/wpVersion.meta.total*100).toFixed()}% Minted

              <div className="p-1 text-center">
                <button onClick={() => setVersion(null)} className="montserrat rounded text-xl border-6 bg-blau text-white hover:text-gray p-1 px-3 mb-1">View All Versions</button>                
              </div>
            </div>
            <div className="flex justify-center">
              <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-4">
                  {
                    wpVersion.contributions.map((contributor, i) => (
                      <div key={i} className="shadow bg-gray-50 text-black text-justify rounded-lg overflow-hidden">
                        <img src={'https://www.gravatar.com/avatar/'+(contributor.gravatar||'00000000000000000000000000000000')+'?s=250&d=mystery'} className="rounded-t-lg w-full" alt="Avatar" />
                        <div className="p-1 text-center">
                          <p className="text-2xl font-bold montserrat text-black">{contributor.name}</p>
                          <p className="text-xl font-bold montserrat text-black"><ContributorTitle props={contributor} /></p>
                        </div>
                        <div className="p-1 text-center">
                          <button onClick={() => loadUser(contributor.username)} className="montserrat rounded text-xl border-6 bg-blau text-white hover:text-gray p-1 px-3 mb-1">View Contributions</button>                
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
        </div> 
      )
    
    } else {
      return (
        <div className="flex flex-col items-center">
            <div className="text-center text-4xl montserrat text-white bg-grey-lighter my-4 ml-3">
                All WordPress versions and their contributors:
            </div>
            <div className="flex justify-center">
              <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-4">
                  {
                    wpVersions.map((wp, i) => (
                      <div key={i} className="shadow bg-gray-50 text-black text-justify rounded-lg overflow-hidden">
                        <div className="relative overflow-hidden">
                          <img src="/core-contributor-nft/images/Wordpress-Logo.svg" className="p-2 rounded-t-lg w-full bg-white opacity-25" alt="WordPress Logo" />
                          <div className="p-1 text-center absolute pt-16 top-0 w-full">
                            <p className="text-2xl font-bold montserrat text-black">WordPress {wp.wp_version}</p>
                            <p className="text-xl font-bold montserrat text-gray-700 italic">{wp.musician}</p>
                            <p className="text-lg font-bold montserrat text-black">{wp.release_date}</p>
                          </div>
                          <div className="p-1 text-center absolute bottom-5 w-full">
                            <p className="text-xl font-bold montserrat text-black">{wp.contributors} Contributors</p>
                          </div>
                        </div>
                        <div className="p-1 text-center">
                          <button onClick={() => loadVersion(wp.wp_version)} className="montserrat rounded text-xl border-6 bg-blau text-white hover:text-gray p-1 px-3 mb-1">View Contributors</button>                
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
        </div> 
      )
    }
  }
}