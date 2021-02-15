import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css';

const Navbar = () => {
    return <>
        <div className={s.nav}>
            <div className={s.menu}>
                <div className={s.item}>
                    <NavLink to='/students' activeClassName={s.activeLink}>Студенты</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to='/groups' activeClassName={s.activeLink}>Группы</NavLink>
                </div>
            </div>
        </div>
    </>
}

export default Navbar;