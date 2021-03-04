import { Container, Typography, Box, Button } from '@material-ui/core';
import Link from 'next/Link';

export default function Index() {
  return (
    <Container maxWidth='sm'>
      <Box my={4}>
        <Typography variant='h4' component='h1' gutterBottom> Next.JS example</Typography>
      </Box>
      <Link href='/'><Button variant='contained' color='primary'> Go to the home page</Button></Link>
    </Container>
  )
} 