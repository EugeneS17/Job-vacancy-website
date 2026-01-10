import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Title, Text, Stack, Box, Button, Group, Badge, Loader, Center, Alert } from '@mantine/core';
import { IconAlertCircle, IconArrowLeft, IconMapPin, IconCurrencyRubel } from '@tabler/icons-react';
import axios from 'axios';
import type { Vacancy } from '../../types/vacancy';
import classes from './VacancyDetailPage.module.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.hh.ru/vacancies';

export function VacancyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVacancy = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get<Vacancy>(`${API_BASE_URL}/${id}`);
        setVacancy(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError('Произошла ошибка при загрузке вакансии');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVacancy();
  }, [id]);

  const formatSalary = (salary: Vacancy['salary']) => {
    if (!salary) return 'Не указана';
    
    const { from, to, currency } = salary;
    const currencySymbol = currency === 'RUR' ? '₽' : currency;
    
    if (from && to) {
      return `${from.toLocaleString()} – ${to.toLocaleString()} ${currencySymbol}`;
    } else if (from) {
      return `от ${from.toLocaleString()} ${currencySymbol}`;
    } else if (to) {
      return `до ${to.toLocaleString()} ${currencySymbol}`;
    }
    
    return 'Не указана';
  };

  if (loading) {
    return (
      <Container size="xl" className={classes.container}>
        <Center py="xl">
          <Loader size="lg" color="blue.7" />
        </Center>
      </Container>
    );
  }

  if (error || !vacancy) {
    return (
      <Container size="xl" className={classes.container}>
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Ошибка"
          color="red"
          variant="light"
          mb="lg"
        >
          {error || 'Вакансия не найдена'}
        </Alert>
        <Button 
          leftSection={<IconArrowLeft size={16} />}
          variant="subtle"
          onClick={() => navigate(-1)}
        >
          Назад к списку вакансий
        </Button>
      </Container>
    );
  }

  return (
    <Container size="xl" className={classes.container}>
      <Button 
        leftSection={<IconArrowLeft size={16} />}
        variant="subtle"
        onClick={() => navigate(-1)}
        className={classes.backButton}
        mb="lg"
      >
        Назад к списку вакансий
      </Button>

      <Box className={classes.content}>
        <Stack gap="lg">
          {/* Header */}
          <Box>
            <Title order={1} className={classes.title}>
              {vacancy.name}
            </Title>
            <Group gap="md" mt="sm">
              <Group gap={4}>
                <IconCurrencyRubel size={16} color="#868E96" />
                <Text size="lg" fw={700} className={classes.salary}>
                  {formatSalary(vacancy.salary)}
                </Text>
              </Group>
              {vacancy.experience && (
                <Text size="sm" c="dimmed">
                  Опыт {vacancy.experience.name.toLowerCase()}
                </Text>
              )}
            </Group>
          </Box>

          {/* Company info */}
          <Box className={classes.companySection}>
            <Text size="lg" fw={600} mb="xs">
              {vacancy.employer.name}
            </Text>
            <Group gap="xs" mb="xs">
              <IconMapPin size={16} color="#868E96" />
              <Text size="sm" c="dimmed">
                {vacancy.area.name}
              </Text>
            </Group>
            {vacancy.employment && vacancy.schedule && (
              <Group gap="xs">
                <Badge variant="light" color="blue" className={classes.badge}>
                  {vacancy.employment.name}
                </Badge>
                <Badge variant="light" color="gray" className={classes.badge}>
                  {vacancy.schedule.name}
                </Badge>
              </Group>
            )}
          </Box>

          {/* Description */}
          {vacancy.description && (
            <Box className={classes.descriptionSection}>
              <Title order={3} className={classes.sectionTitle}>
                Компания
              </Title>
              
              <Box 
                className={classes.description}
                dangerouslySetInnerHTML={{ __html: vacancy.description }}
              />
            </Box>
          )}
          
          {/* Snippet - fallback if no description */}
          {!vacancy.description && vacancy.snippet && (vacancy.snippet.requirement || vacancy.snippet.responsibility) && (
            <Box className={classes.descriptionSection}>
              <Title order={3} className={classes.sectionTitle}>
                Описание вакансии
              </Title>
              
              {vacancy.snippet.requirement && (
                <Box mb="md">
                  <Text fw={600} mb="xs" size="sm">
                    Требования:
                  </Text>
                  <Text 
                    className={classes.description}
                    dangerouslySetInnerHTML={{ __html: vacancy.snippet.requirement }}
                  />
                </Box>
              )}
              
              {vacancy.snippet.responsibility && (
                <Box>
                  <Text fw={600} mb="xs" size="sm">
                    Обязанности:
                  </Text>
                  <Text 
                    className={classes.description}
                    dangerouslySetInnerHTML={{ __html: vacancy.snippet.responsibility }}
                  />
                </Box>
              )}
            </Box>
          )}

          {/* Key Skills */}
          {vacancy.key_skills && vacancy.key_skills.length > 0 && (
            <Box className={classes.skillsSection}>
              <Title order={3} className={classes.sectionTitle} mb="md">
                Ключевые навыки
              </Title>
              <Group gap="xs">
                {vacancy.key_skills.map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="light" 
                    color="blue" 
                    className={classes.skillBadge}
                    size="lg"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </Group>
            </Box>
          )}

          {/* Link to vacancy */}
          <Box className={classes.linkSection}>
            <Button
              component="a"
              href={vacancy.alternate_url}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className={classes.applyButton}
            >
              Откликнуться на hh.ru
            </Button>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}


