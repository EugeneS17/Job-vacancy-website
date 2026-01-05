import { Stack, Box } from '@mantine/core';
import { SkillsInput } from '../SkillsInput/SkillsInput';
import classes from './VacancyFilters.module.css';

interface VacancyFiltersProps {
  skills: string[];
  onAddSkill: (skill: string) => void;
  onRemoveSkill: (skill: string) => void;
}

export function VacancyFilters({
  skills,
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
      </Stack>
    </Box>
  );
}
