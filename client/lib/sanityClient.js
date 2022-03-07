
import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'qbgmsihw',
  dataset: 'production',
  apiVersion: 'v1',
  token:
    'skWc34tP1VxyLHfatKyMPHnoqfthcQ2QXugqYU7aV70kmzfQZKM3ceDFsNCzgmBbTBvjVu7WUPHLVIdtop2IGvgx4svZdHN1xrwhRD4GENEAKKY2DpEjTnue9CrZd3BlVryToE1HaiIV1FV1cetlJAiMZ8qkDQTwVefe6IanvgCsi72YCxCz',
  useCdn: false,
})