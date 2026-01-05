import { Box, Container, Group, Text } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/image 2.svg';
import ProfileIcon from '../../assets/Vector.svg';
import classes from './Header.module.css';

export function Header() {
  const location = useLocation();
  const isVacanciesPage = location.pathname.startsWith('/vacancies');

  return (
    <Box component="header" className={classes.header}>
      <Container size="xl" className={classes.container}>
        <Group justify="space-between" h="100%" w="100%">
          <Link to="/vacancies/moscow" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src={Logo} alt="hh" height={24} />
            <Text className={classes.logoText}>.FrontEnd</Text>
          </Link>

          <Group gap={24} className={classes.nav}>
            <Link 
              to="/vacancies/moscow" 
              className={`${classes.link} ${isVacanciesPage ? classes.activeLink : ''}`}
              style={{ textDecoration: 'none' }}
            >
              Вакансии FE
              {isVacanciesPage && <span className={classes.activeDot}></span>}
            </Link>
            <a href="#" className={classes.link} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <img src={ProfileIcon} alt="" width={18} height={18} />
              Обо мне
            </a>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
