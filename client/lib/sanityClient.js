
import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'k79n8ha4',
  dataset: 'production',
  apiVersion: 'v1',
  token:
    'skWBPW9qz7Kiai3YLcA57GvzmMftGrISXWwv8YvJutTFF7XidOz2gcutwQKdmpVc36OspTEn1nAoI4L2DxpaU8ujUdSmjFc3s58wSACEdKtRSs4sER1cB1zafMvIa1is7DT7FCdAaTitYLsaZJKCGF0D7JMVXoJD5wnKoXFz1W2l3kyIZZqQ',
  useCdn: false,
})