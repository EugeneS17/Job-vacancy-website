import { Card, Text, Badge, Group, Button, Stack } from '@mantine/core';
import type { Vacancy } from '../../types/vacancy';
import classes from './VacancyCard.module.css';

interface VacancyCardProps {
  vacancy: Vacancy;
}

function formatSalary(salary: Vacancy['salary']): string {
  if (!salary) return 'Зарплата не указана';

  const formatNumber = (num: number) => num.toLocaleString('ru-RU').replace(/\s/g, ' ');

  if (salary.from && salary.to) {
    return `${formatNumber(salary.from)} – ${formatNumber(salary.to)} ₽`;
  }
  if (salary.from) {
    return `от ${formatNumber(salary.from)} ₽`;
  }
  if (salary.to) {
    return `до ${formatNumber(salary.to)} ₽`;
  }

  return 'Зарплата не указана';
}

function getExperienceText(experience: Vacancy['experience']): string {
  switch (experience.id) {
    case 'noExperience':
      return 'Без опыта';
    case 'between1And3':
      return 'Опыт 1-3 года';
    case 'between3And6':
      return 'Опыт 3-6 лет';
    case 'moreThan6':
      return 'Опыт более 6 лет';
    default:
      return experience.name;
  }
}

function getWorkFormatBadge(schedule: Vacancy['schedule']): { label: string; variant: 'remote' | 'office' | 'hybrid' } | null {
  switch (schedule.id) {
    case 'remote':
      return { label: 'МОЖНО УДАЛЁННО', variant: 'remote' };
    case 'fullDay':
      return { label: 'ОФИС', variant: 'office' };
    case 'flexible':
    case 'shift':
      return { label: 'ГИБРИД', variant: 'hybrid' };
    default:
      return null;
  }
}

export function VacancyCard({ vacancy }: VacancyCardProps) {
  const workFormat = getWorkFormatBadge(vacancy.schedule);

  return (
    <Card className={classes.card} padding={0} withBorder>
      <Stack gap={16}>
        <Text className={classes.title}>
          {vacancy.name}
        </Text>

        <Group gap="md" align="center">
          <Text className={classes.salary}>
            {formatSalary(vacancy.salary)}
          </Text>
          <Text className={classes.experience}>
            {getExperienceText(vacancy.experience)}
          </Text>
        </Group>

        <Text className={classes.employer}>
          {vacancy.employer.name}
        </Text>

        {workFormat && (
          <Badge 
            className={`${classes.badge} ${classes[workFormat.variant]}`}
            variant="filled"
            size="sm"
          >
            {workFormat.label}
          </Badge>
        )}

        <Text className={classes.city}>
          {vacancy.area.name}
        </Text>

        <Group gap={12} mt="xs" wrap="nowrap">
          <Button
            variant="filled"
            className={classes.buttonPrimary}
          >
            Смотреть вакансию
          </Button>

          <Button
            component="a"
            href={vacancy.alternate_url}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            className={classes.buttonSecondary}
          >
            Откликнуться
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
