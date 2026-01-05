import { Container, Title, Text, Button, Stack, Box } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from './NotFoundPage.module.css';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container size="xl" className={classes.container}>
      <Box className={classes.content}>
        <Stack align="center" gap="xl">
          <Box className={classes.imageWrapper}>
            <img 
              src="/cat-404.png" 
              alt="404 - страница не найдена" 
              className={classes.image}
            />
          </Box>
          <Title order={1} className={classes.title}>
            Упс! Такой страницы не существует
          </Title>
          <Text size="lg" c="dimmed" className={classes.subtitle}>
            Давайте перейдём к началу.
          </Text>
          <Button 
            size="md" 
            onClick={() => navigate('/vacancies/moscow')}
            className={classes.button}
          >
            На главную
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

