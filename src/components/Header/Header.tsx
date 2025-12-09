import { Box, Container, Group, Anchor, Text } from '@mantine/core';
import Logo from '../../assets/image 2.svg';
import ProfileIcon from '../../assets/Vector.svg';
import classes from './Header.module.css';

export function Header() {
  return (
    <Box component="header" className={classes.header}>
      <Container size="xl" className={classes.container}>
        <Group justify="space-between" h="100%" w="100%">
          <Group gap={8}>
            <img src={Logo} alt="hh" height={24} />
            <Text className={classes.logoText}>.FrontEnd</Text>
          </Group>

          <Group gap={24} className={classes.nav}>
            <Anchor href="#" className={`${classes.link} ${classes.activeLink}`} underline="never">
              Вакансии FE
              <span className={classes.activeDot}></span>
            </Anchor>
            <Anchor href="#" className={classes.link} underline="never">
              <img src={ProfileIcon} alt="" width={18} height={18} />
              Обо мне
            </Anchor>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
