import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { TextInput, Pill, Group, ActionIcon, Text, Stack, Box } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import classes from './SkillsInput.module.css';

interface SkillsInputProps {
  skills: string[];
  onAddSkill: (skill: string) => void;
  onRemoveSkill: (skill: string) => void;
}

export function SkillsInput({ skills, onAddSkill, onRemoveSkill }: SkillsInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleAddSkill = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !skills.includes(trimmedValue)) {
      onAddSkill(trimmedValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <Stack gap={12}>
      <Text className={classes.label}>Ключевые навыки</Text>

      <Group gap={8} align="flex-end" wrap="nowrap">
        <TextInput
          placeholder="Навык"
          value={inputValue}
          onChange={(event) => setInputValue(event.currentTarget.value)}
          onKeyDown={handleKeyDown}
          className={classes.input}
          size="sm"
        />
        <ActionIcon
          variant="filled"
          color="blue.7"
          size={36}
          onClick={handleAddSkill}
          disabled={!inputValue.trim()}
          aria-label="Добавить навык"
          className={classes.addButton}
        >
          <IconPlus size={18} />
        </ActionIcon>
      </Group>

      <Box className={classes.pillsContainer}>
        <Group gap={8} align="center">
          {skills.map((skill) => (
            <Pill
              key={skill}
              withRemoveButton
              onRemove={() => onRemoveSkill(skill)}
              className={classes.pill}
              size="md"
            >
              {skill}
            </Pill>
          ))}
        </Group>
      </Box>
    </Stack>
  );
}
