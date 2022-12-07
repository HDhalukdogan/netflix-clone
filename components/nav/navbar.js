import styles from "./navbar.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const NavBar = (props) => {
    const { username } = props;

    const [showDropdown, setShowDropdown] = useState(false)

    const router = useRouter();
    const handleOnClickHome = (e) => {
        e.preventDefault()
        router.push('/')
    }
    const handleOnClickMylist = (e) => {
        e.preventDefault()
        router.push('/browse/my-list')
    }
    const handleOnShowDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Link className={styles.logolink} href="/">
                    <div className={styles.logoWrapper}>
                        <div className={styles.logoWrapper}>
                            <Image
                                src="/static/netflix.svg"
                                alt="Netflix logo"
                                width="128"
                                height="34"
                            />
                        </div>
                    </div>
                </Link>
                <ul className={styles.navItems}>
                    <il className={styles.navItem} onClick={handleOnClickHome} >Home</il>
                    <il className={styles.navItem2} onClick={handleOnClickMylist}>My List</il>
                </ul>
                <nav className={styles.navContainer}>
                    <div>
                        <button className={styles.usernameBtn} onClick={handleOnShowDropdown}>
                            <p className={styles.username}>{username}</p>
                            <Image
                                src="/static/expand_more.svg"
                                alt="Expand more"
                                width="24"
                                height="24"
                            />
                        </button>
                        {showDropdown && <div className={styles.navDropdown}>
                            <div>
                                <Link className={styles.linkName} href='/login'>
                                    Sign Out
                                </Link>
                                <div className={styles.lineWrapper}>
                                </div>
                            </div>
                        </div>}
                    </div>
                </nav>
            </div>
        </div >
    );
};
export default NavBar;