import styles from "./navbar.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { magic } from "../../lib/magic-client";

const NavBar = () => {

    const [showDropdown, setShowDropdown] = useState(false)
    const [username, setUsername] = useState("")
    const [didToken, setDidToken] = useState("");
    const router = useRouter();
    useEffect(() => {
        const applyUsernameInNav = async () => {
            try {
                const { email, issuer } = await magic.user.getMetadata();
                const token = await magic.user.getIdToken();
                setDidToken(token);
                if (email) {
                    setUsername(email);
                }
            } catch (error) {
                console.log("Error retrieving email:", error);
            }
        }
        applyUsernameInNav();
    }, []);
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

    const handleSignout = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/logout", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${didToken}`,
                    "Content-Type": "application/json",
                },
            });

            const res = await response.json();
        } catch (error) {
            console.error("Error logging out", error);
            router.push("/login");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Link className={styles.logolink} href="/">
                    <div className={styles.logoWrapper}>
                        <Image
                            src="/static/netflix.svg"
                            alt="Netflix logo"
                            width="128"
                            height="34"
                        />
                    </div>
                </Link>
                <ul className={styles.navItems}>
                    <li className={styles.navItem} onClick={handleOnClickHome} >Home</li>
                    <li className={styles.navItem2} onClick={handleOnClickMylist}>My List</li>
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
                                <a className={styles.linkName} onClick={handleSignout}>
                                    Sign Out
                                </a>
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