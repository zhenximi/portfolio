/* eslint-disable max-len */
import React from 'react'
import PropTypes from 'prop-types'

import Favicon from './FavIcon'
import GoogleTagManager from './GoogleTagManager'

export default class Html extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.string,
    routeStores: PropTypes.object.isRequired,
  }

  injectStore () {
    const serializedStores = JSON.stringify(this.props.routeStores)
    const __html = `var SERIALIZED_STORES = ${serializedStores}`
    return (
      <script
        dangerouslySetInnerHTML={{ __html }}
      />
    )
  }

  render () {
    const {title, description, keywords} = this.props
    const favicon = Favicon()
    const gtm = GoogleTagManager()

    return (
      <html>
        <head>
          <title>{title}</title>
          <link rel='stylesheet' type='text/css' href='/static/client.css' />
          <meta name='viewport' content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1' />
          <meta name='description' content={description} />
          <meta name='keywords' content={keywords} />
          {favicon}
          {gtm}
        </head>
        <body>
          <main id='main' dangerouslySetInnerHTML={{__html: this.props.children}} />
          {this.injectStore()}
          <script src='/static/client.js'/>
        </body>
      </html>
    )
  }
}
