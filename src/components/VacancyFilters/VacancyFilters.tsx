import { Select, Stack, Box } from '@mantine/core';
import { IconMapPin } from '@tabler/icons-react';
import { SkillsInput } from '../SkillsInput/SkillsInput';
import { AREA_LABELS } from '../../types/vacancy';
import classes from './VacancyFilters.module.css';

interface VacancyFiltersProps {
  area: string;
  skills: string[];
  onAreaChange: (value: string) => void;
  onAddSkill: (skill: string) => void;
  onRemoveSkill: (skill: string) => void;
}

const areaOptions = Object.entries(AREA_LABELS).map(([value, label]) => ({
  value,
  label,
}));

export function VacancyFilters({
  area,
  skills,
  onAreaChange,
  onAddSkill,
  onRemoveSkill,
}: VacancyFiltersProps) {
  return (
    <Box className={classes.filters}>
      <Stack gap={24}>
        <SkillsInput
          skills={skills}
          onAddSkill={onAddSkill}
          onRemoveSkill={onRemoveSkill}
        />

        <Select
          label="Город"
          placeholder="Выберите город"
          leftSection={<IconMapPin size={16} color="#868E96" />}
          data={areaOptions}
          value={area}
          onChange={(value) => onAreaChange(value || '')}
          className={classes.citySelect}
          size="sm"
          clearable={false}
          styles={{
            label: {
              fontSize: '16px',
              fontWeight: 700,
              color: '#000',
              marginBottom: '8px',
            },
          }}
        />
      </Stack>
    </Box>
  );
}
