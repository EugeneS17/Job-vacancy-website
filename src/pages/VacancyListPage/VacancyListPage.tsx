import { useEffect, useCallback, useMemo, useState, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { Container, Title, Text, Stack, Pagination, Center, Loader, Alert, TextInput, Button, Group, Grid, Box, Tabs } from '@mantine/core';
import { IconAlertCircle, IconSearch } from '@tabler/icons-react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchVacancies,
  setSearchText,
  setArea,
  addSkill,
  removeSkill,
  setPage,
  setSkills,
} from '../../store/vacanciesSlice';
import { VacancyFilters } from '../../components/VacancyFilters/VacancyFilters';
import { VacancyCard } from '../../components/VacancyCard/VacancyCard';
import { AREAS } from '../../types/vacancy';
import classes from './VacancyListPage.module.css';

export function VacancyListPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { city } = useParams<{ city: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const { items, loading, error, totalPages, filters } = useAppSelector(
    (state) => state.vacancies
  );

  const [searchInput, setSearchInput] = useState(() => searchParams.get('text') || '');
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (isInitializedRef.current) return;

    const textParam = searchParams.get('text') || '';
    const skillsParam = searchParams.get('skills') || '';
    const skills = skillsParam ? skillsParam.split(',').filter(Boolean) : ['TypeScript', 'React', 'Redux'];

    dispatch(setSearchText(textParam));
    dispatch(setSkills(skills));
    isInitializedRef.current = true;
  }, [dispatch, searchParams]);

  useEffect(() => {
    const areaId = city === 'moscow' ? AREAS.MOSCOW : city === 'petersburg' ? AREAS.SAINT_PETERSBURG : AREAS.MOSCOW;
    if (filters.area !== areaId) {
      dispatch(setArea(areaId));
    }
  }, [city, dispatch, filters.area]);

  useEffect(() => {
    if (!isInitializedRef.current) return;

    const params = new URLSearchParams();

    if (filters.text) {
      params.set('text', filters.text);
    }

    if (filters.skillSet.length > 0) {
      params.set('skills', filters.skillSet.join(','));
    }

    setSearchParams(params, { replace: true });
  }, [filters.text, filters.skillSet, setSearchParams]);

  const fetchParams = useMemo(
    () => ({
      text: filters.text,
      area: filters.area,
      skillSet: filters.skillSet,
      page: filters.page,
    }),
    [filters.text, filters.area, filters.skillSet, filters.page]
  );

  useEffect(() => {
    dispatch(fetchVacancies(fetchParams));
  }, [dispatch, fetchParams]);

  const handleTabChange = useCallback(
    (value: string | null) => {
      if (value) {
        navigate(`/vacancies/${value}`);
      }
    },
    [navigate]
  );

  const handleSearch = useCallback(() => {
    dispatch(setSearchText(searchInput));
  }, [dispatch, searchInput]);

  const handleSearchKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSearch();
      }
    },
    [handleSearch]
  );

  const handleAddSkill = useCallback(
    (skill: string) => {
      dispatch(addSkill(skill));
    },
    [dispatch]
  );

  const handleRemoveSkill = useCallback(
    (skill: string) => {
      dispatch(removeSkill(skill));
    },
    [dispatch]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      dispatch(setPage(page - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [dispatch]
  );

  return (
    <Container size="xl" className={classes.container}>
      {/* Header section with title and search */}
      <Box className={classes.headerSection}>
        <Group justify="space-between" align="flex-start" wrap="wrap" gap="md">
          <Stack gap={4}>
            <Title order={1} className={classes.title}>
              Список вакансий
            </Title>
            <Text className={classes.subtitle}>
              по профессии Frontend-разработчик
            </Text>
          </Stack>

          <Group gap="sm" className={classes.searchGroup}>
            <TextInput
              placeholder="Должность или название компании"
              leftSection={<IconSearch size={16} color="#868E96" />}
              value={searchInput}
              onChange={(event) => setSearchInput(event.currentTarget.value)}
              onKeyDown={handleSearchKeyDown}
              className={classes.searchInput}
              size="md"
            />
            <Button
              variant="filled"
              className={classes.searchButton}
              onClick={handleSearch}
            >
              Найти
            </Button>
          </Group>
        </Group>
      </Box>

      {error && (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Ошибка"
          color="red"
          variant="light"
          mb="lg"
        >
          {error}
        </Alert>
      )}

      {/* Main content with two columns */}
      <Grid gutter={32}>
        <Grid.Col span={{ base: 12, md: 'auto' }} style={{ flexBasis: '280px', flexGrow: 0 }}>
          <VacancyFilters
            skills={filters.skillSet}
            onAddSkill={handleAddSkill}
            onRemoveSkill={handleRemoveSkill}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 'auto' }} style={{ flex: 1 }}>
          {/* City Tabs */}
          <Tabs 
            value={city} 
            onChange={handleTabChange}
            className={classes.tabs}
            variant="unstyled"
          >
            <Tabs.List className={classes.tabsList}>
              <Tabs.Tab value="moscow" className={classes.tabItem}>Москва</Tabs.Tab>
              <Tabs.Tab value="petersburg" className={classes.tabItem}>Санкт-Петербург</Tabs.Tab>
            </Tabs.List>
          </Tabs>

          {loading ? (
            <Center py="xl">
              <Loader size="lg" color="blue.7" />
            </Center>
          ) : (
            <>
              {items.length === 0 && !loading && !error ? (
                <Center py="xl">
                  <Text c="dimmed" size="lg">
                    Вакансии не найдены
                  </Text>
                </Center>
              ) : (
                <Stack gap={16}>
                  {items.map((vacancy) => (
                    <VacancyCard key={vacancy.id} vacancy={vacancy} />
                  ))}
                </Stack>
              )}

              {totalPages > 1 && (
                <Center mt="xl">
                  <Pagination
                    total={totalPages}
                    value={filters.page + 1}
                    onChange={handlePageChange}
                    size="sm"
                    radius="sm"
                    withEdges
                    className={classes.pagination}
                  />
                </Center>
              )}
            </>
          )}
        </Grid.Col>
      </Grid>
    </Container>
  );
}
